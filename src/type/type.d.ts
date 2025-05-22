export type Book = {
  id: string
  title: string
  content: string
  tags: string[],
}

export type Folder = {
  id: number;
  name: string;
  description: string;
};

export type File = {
  id: number;
  title: string;
  description: string;
  image_path: string;
  tags: {
    id: number;
    tag: string;
  }[],
  uploaded_at: string;
};
