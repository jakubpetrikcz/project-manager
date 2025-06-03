export type AttachmentResponse = {
  data: Attachment[];
};

type Attachment = {
  gid: string;
  download_url: string;
};

export type UploadAttachmentsResponse = {
  gid: string;
  name: string;
};

export type UploadAttachmentsArgs = {
  taskGid: string;
  file: FormData;
};
