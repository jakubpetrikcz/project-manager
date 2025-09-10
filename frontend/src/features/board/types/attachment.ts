export type AttachmentResponse = {
  data: Attachment[];
};

type Attachment = {
  gid: string;
  download_url: string;
};

export type UploadAttachmentsResponse = {
  data: {
    gid: string;
    name: string;
  };
};

export type UploadAttachmentsArgs = {
  taskGid: string;
  file: FormData;
};

export type DeleteAttachmentArgs = {
  attachmentGid: string;
};
