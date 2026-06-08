const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  pool: true,
  maxConnections: 3,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const banner = `<tr>
  <td style="padding:0;">
    <img src="https://drive.google.com/thumbnail?id=1hKZsJa-eJlopcgY0IneYKn1WWQHaOVgn&sz=w1200"
      alt="New Bath Expo Banner"
      style="width:100%;max-width:600px;height:auto;display:block;border-bottom:4px solid #003366;"/>
  </td>
</tr>`;

const footer = `<tr>
  <td style="background:#003366;padding:30px 40px;text-align:center;">
    <p style="margin:0;font-size:14px;color:#ffffff;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">New Bath Expo</p>
    <p style="margin:5px 0 15px;font-size:12px;color:#a3c2e0;">Quality Craftsmanship. Modern Design.</p>
    <div style="font-size:11px;color:#718096;">&copy; ${new Date().getFullYear()} New Bath Expo. All rights reserved.</div>
  </td>
</tr>`;

const wrapHtml = (title, subtitle, body) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Bath Expo | ${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);">
          ${banner}
          <tr>
            <td style="background:#ffffff;padding:30px 40px 10px;">
              <h1 style="margin:0;color:#003366;font-size:24px;font-weight:700;letter-spacing:0.5px;">${title}</h1>
              <p style="margin:5px 0 0;color:#718096;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;">${subtitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 40px;">${body}</td>
          </tr>
          ${footer}
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:#a0aec0;text-align:center;max-width:600px;">
          This inquiry was sent from the contact form on newbathexpo.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

const fieldRow = (label, value) => `
  <tr>
    <td style="padding:0 0 20px;vertical-align:top;">
      <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">${label}</p>
      <p style="margin:0;font-size:15px;color:#1a202c;">${value || '—'}</p>
    </td>
  </tr>`;

const sectionHeader = (label) => `
  <tr>
    <td style="padding:10px 0 15px;border-top:1px solid #e1e8f0;">
      <h2 style="margin:0;font-size:13px;color:#003366;font-weight:700;text-transform:uppercase;">${label}</h2>
    </td>
  </tr>`;

// ── Booking Form ──────────────────────────────────────────────────────────────

const buildBookingHtml = (d) => {
  const body = `
    <div style="margin-bottom:25px;border-bottom:1px solid #e1e8f0;padding-bottom:15px;">
      <h2 style="margin:0;font-size:14px;color:#003366;font-weight:700;text-transform:uppercase;">Customer Profile</h2>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-bottom:25px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Name</p>
          <p style="margin:0;font-size:16px;color:#1a202c;font-weight:500;">${d.firstName} ${d.lastName}</p>
        </td>
        <td width="50%" style="padding-bottom:25px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Email</p>
          <p style="margin:0;font-size:16px;color:#003366;font-weight:500;">${d.email}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:25px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Phone</p>
          <p style="margin:0;font-size:16px;color:#1a202c;">${d.phone}</p>
        </td>
        <td width="50%" style="padding-bottom:25px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Service Type</p>
          <p style="margin:0;font-size:16px;color:#2c5282;font-weight:600;">${d.serviceType}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:20px;background:#f7fafc;border:1px solid #edf2f7;border-radius:12px;">
          <p style="margin:0 0 8px;font-size:11px;color:#718096;text-transform:uppercase;font-weight:bold;">Requested Consultation Date</p>
          <p style="margin:0;font-size:18px;color:#003366;font-weight:bold;">📅 ${d.preferredDate}</p>
        </td>
      </tr>
    </table>
    <div style="margin-top:30px;">
      <p style="margin:0 0 10px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Message / Notes</p>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
        <p style="margin:0;font-size:15px;color:#4a5568;line-height:1.7;">${d.projectDetails || '—'}</p>
      </div>
    </div>`;

  return wrapHtml('New Lead Received', 'Project Inquiry Details', body);
};

// ── Design Request Form ───────────────────────────────────────────────────────

const buildDesignRequestHtml = (d) => {
  const body = `
    <table width="100%" cellpadding="0" cellspacing="0">
      ${sectionHeader('Customer Profile')}
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Name</p>
          <p style="margin:0;font-size:16px;color:#1a202c;font-weight:500;">${d.firstName} ${d.lastName}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Email</p>
          <p style="margin:0;font-size:16px;color:#003366;font-weight:500;">${d.email}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding-bottom:25px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Phone</p>
          <p style="margin:0;font-size:16px;color:#1a202c;">${d.phone}</p>
        </td>
      </tr>

      ${sectionHeader('Design Preferences')}
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Wall Design</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.wallDesign || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Tiles</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.tiles || '—'}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Bath</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.bath || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Sink</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.sink || '—'}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Faucet</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.faucet || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Shower</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.shower || '—'}</p>
        </td>
      </tr>

      ${sectionHeader('Additional Notes')}
      <tr>
        <td colspan="2">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
            <p style="margin:0;font-size:15px;color:#4a5568;line-height:1.7;">${d.notes || '—'}</p>
          </div>
        </td>
      </tr>
    </table>`;

  return wrapHtml('New Design Request', 'Design Preferences Inquiry', body);
};

// ── Lead Sheet Form ───────────────────────────────────────────────────────────

const buildLeadSheetHtml = (d) => {
  const workList = Array.isArray(d.workItems) && d.workItems.length
    ? d.workItems.join(', ')
    : '—';

  const body = `
    <table width="100%" cellpadding="0" cellspacing="0">

      ${sectionHeader('Customer Contact')}
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Full Name</p>
          <p style="margin:0;font-size:16px;color:#1a202c;font-weight:600;">${d.fullName || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Phone</p>
          <p style="margin:0;font-size:16px;color:#1a202c;">${d.phone || '—'}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Email</p>
          <p style="margin:0;font-size:16px;color:#003366;">${d.email || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Address</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.address || '—'}, ${d.city || '—'} ${d.zip || ''}</p>
        </td>
      </tr>

      ${sectionHeader('Project Scope')}
      ${fieldRow('Possible Work Wanted', workList)}
      <tr>
        <td colspan="2" style="padding-bottom:20px;">
          <p style="margin:0 0 8px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Estimator Notes</p>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
            <p style="margin:0;font-size:15px;color:#4a5568;line-height:1.7;">${d.estimatorNotes || '—'}</p>
          </div>
        </td>
      </tr>

      ${sectionHeader('Qualification')}
      <tr>
        <td width="50%" style="padding-bottom:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Years Owned Home</p>
          <p style="margin:0;font-size:15px;color:#1a202c;">${d.yearsOwned || '—'}</p>
        </td>
        <td width="50%" style="padding-bottom:20px;padding-left:20px;vertical-align:top;">
          <p style="margin:0 0 5px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Remodel Timeline</p>
          <p style="margin:0;font-size:15px;color:#2c5282;font-weight:600;">${d.remodelTimeline || '—'}</p>
        </td>
      </tr>
      ${fieldRow('Estimates Received', d.estimatesReceived ?? '—')}

      ${sectionHeader('Office Use Only')}
      <tr>
        <td colspan="2" style="padding-bottom:10px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7fafc;border:1px solid #e1e8f0;border-radius:10px;padding:16px;">
            <tr>
              <td width="50%" style="padding:12px 16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Today's Date</p>
                <p style="margin:0;font-size:14px;color:#4a5568;">${d.internalDate || '—'}</p>
              </td>
              <td width="50%" style="padding:12px 16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Set By</p>
                <p style="margin:0;font-size:14px;color:#4a5568;">${d.setBy || '—'}</p>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:12px 16px;vertical-align:top;border-top:1px solid #e1e8f0;">
                <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Estimate Date</p>
                <p style="margin:0;font-size:14px;color:#4a5568;">${d.estimateDate || '—'}</p>
              </td>
              <td width="50%" style="padding:12px 16px;vertical-align:top;border-top:1px solid #e1e8f0;">
                <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Day</p>
                <p style="margin:0;font-size:14px;color:#4a5568;">${d.day || '—'}</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:12px 16px;border-top:1px solid #e1e8f0;">
                <p style="margin:0 0 4px;font-size:11px;color:#a0aec0;text-transform:uppercase;font-weight:bold;">Time Set</p>
                <p style="margin:0;font-size:14px;color:#4a5568;">${d.timeSet || '—'}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>`;

  return wrapHtml('New Lead Sheet', 'Sales Lead Capture', body);
};

// ── Exports ───────────────────────────────────────────────────────────────────

const sendBookingEmail = async (data) => {
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Booking Request from ${data.firstName} ${data.lastName}`,
    html: buildBookingHtml(data),
    text: `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.serviceType}\nDate: ${data.preferredDate}\nNotes: ${data.projectDetails || '—'}`
  });
};

const sendDesignRequestEmail = async (data) => {
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Design Request from ${data.firstName} ${data.lastName}`,
    html: buildDesignRequestHtml(data),
    text: `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nWall Design: ${data.wallDesign || '—'}\nTiles: ${data.tiles || '—'}\nBath: ${data.bath || '—'}\nSink: ${data.sink || '—'}\nFaucet: ${data.faucet || '—'}\nShower: ${data.shower || '—'}\nNotes: ${data.notes || '—'}`
  });
};

const sendLeadSheetEmail = async (data) => {
  const workList = Array.isArray(data.workItems) && data.workItems.length
    ? data.workItems.join(', ')
    : '—';
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Lead Sheet from ${data.fullName || 'Unknown'}`,
    html: buildLeadSheetHtml(data),
    text: `Name: ${data.fullName || '—'}\nPhone: ${data.phone || '—'}\nEmail: ${data.email || '—'}\nAddress: ${data.address || '—'}, ${data.city || '—'} ${data.zip || ''}\n\nWork Wanted: ${workList}\nEstimator Notes: ${data.estimatorNotes || '—'}\n\nYears Owned: ${data.yearsOwned || '—'}\nRemodel Timeline: ${data.remodelTimeline || '—'}\nEstimates Received: ${data.estimatesReceived ?? '—'}\n\n--- Office Use ---\nDate: ${data.internalDate || '—'}\nSet By: ${data.setBy || '—'}\nEstimate Date: ${data.estimateDate || '—'}\nDay: ${data.day || '—'}\nTime Set: ${data.timeSet || '—'}`
  });
};

module.exports = { sendBookingEmail, sendDesignRequestEmail, sendLeadSheetEmail };
