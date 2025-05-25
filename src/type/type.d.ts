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
  total_photo_count: number;
};

export type File = {
  id: number;
  name: string;
  description: string;
  image_path: string;
  tags: {
    id: number;
    tag: string;
  }[],
};
