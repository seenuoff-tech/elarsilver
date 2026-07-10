import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { orderId, customerData, items, total, date } = data;

    // Set up nodemailer transporter
    // For production, these should be securely stored in .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'placeholder_user',
        pass: process.env.SMTP_PASS || 'placeholder_pass',
      },
    });

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (x${item.quantity})</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B5E64; text-align: center;">Elara Silver Shop</h2>
        <h3 style="text-align: center;">Order Confirmation: ${orderId}</h3>
        <p>Dear ${customerData.fullName},</p>
        <p>Thank you for your purchase! We have successfully received your order.</p>
        
        <h4>Order Details</h4>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Shipping Address:</strong><br/>
           ${customerData.address}, ${customerData.city}, ${customerData.pincode}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f5f5f7;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; text-align: right; font-weight: bold;">Grand Total (incl. shipping):</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${total}</td>
            </tr>
          </tfoot>
        </table>
        
        <p style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
          For any queries, please contact us at support@elarasilver.com
        </p>
      </div>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elarasilver.com';

    // In a real scenario, you'd handle errors properly if SMTP isn't configured
    // We will attempt to send, but catch errors to prevent the API from failing entirely
    try {
      // 1. Send Email to Customer
      await transporter.sendMail({
        from: '"Elara Silver" <noreply@elarasilver.com>',
        to: customerData.email,
        subject: `Order Confirmation - ${orderId}`,
        html: emailHtml,
      });

      // 2. Send Email to Admin
      await transporter.sendMail({
        from: '"Elara Silver System" <system@elarasilver.com>',
        to: adminEmail,
        subject: `New Order Received - ${orderId}`,
        html: `<p>A new order has been placed by ${customerData.fullName} (${customerData.email}).</p>` + emailHtml,
      });
      
      console.log('Order emails sent successfully.');
    } catch (emailError) {
      console.error('Email sending failed (likely due to missing SMTP credentials):', emailError);
      // We don't want to throw here, so the frontend still succeeds
    }

    return NextResponse.json({ success: true, message: 'Order processed and emails triggered.' });
  } catch (error) {
    console.error('Error in checkout API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
