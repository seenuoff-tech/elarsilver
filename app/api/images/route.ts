import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public/images');
    
    // Read the directory
    let files;
    try {
      files = await readdir(imagesDir);
    } catch (e) {
      // If directory doesn't exist, return empty array
      return NextResponse.json({ success: true, images: [] });
    }

    // Filter for image files and get their stats
    const images = [];
    
    for (const file of files) {
      // Basic check for image extensions
      if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        const filePath = join(imagesDir, file);
        const fileStat = await stat(filePath);
        
        images.push({
          name: file,
          url: `/images/${file}`,
          size: fileStat.size,
          createdAt: fileStat.birthtime
        });
      }
    }
    
    // Sort by newest first
    images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ success: false, error: 'Filename is required' }, { status: 400 });
    }

    // Security check to prevent path traversal
    if (filename.includes('/') || filename.includes('..')) {
      return NextResponse.json({ success: false, error: 'Invalid filename' }, { status: 400 });
    }

    const filePath = join(process.cwd(), 'public/images', filename);
    
    try {
      await unlink(filePath);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
      }
      throw e;
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
