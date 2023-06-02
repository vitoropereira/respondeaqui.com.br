export interface SendMailData {
  subject: string;
  body: string;
}

export interface SendMail {
  sendMail: (data: SendMailData) => Promise<void>;
}
