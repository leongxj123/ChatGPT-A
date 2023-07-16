/**
 * Elastic Email sender
 */
const apiKey = process.env.ELASTICE_EMAIL_API_KEY!;
const senderEmail = process.env.ELASTICE_EMAIL_SENDER!;

export default async function sendEmail(to: string, code: string | number) {
  const params = {
    apikey: apiKey,
    from: senderEmail,
    to: to,
    subject: "[ChatGPT-Admin-Web] 激活码",
    bodyHtml: data.bodyHtml.replace("${code}", code.toString()),
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
