import FormData from 'form-data';

/**
 * Elastic Email sender
 */
const apiKey = process.env.ELASTIC_EMAIL_API_KEY!;
const senderEmail = process.env.ELASTIC_EMAIL_SENDER!;

export default async function sendEmail(to: string, code: string | number) {
  process.env.ACTIVATION_CODE = code.toString();

  const bodyHtml = `您的激活码是：${process.env.ACTIVATION_CODE}`;

  const params = {
    apikey: apiKey,
    from: senderEmail,
    to: to,
    subject: "[ChatGPT-Admin-Web] 激活码",
    bodyHtml: bodyHtml,
  };

  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }

  const response = await fetch("https://api.elasticemail.com/v2/email/send", {
    method: "POST",
    body: formData,
  });

  return response.ok;
}
