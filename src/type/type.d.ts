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
  total_photo_size: number;
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
  size_in_bytes: number;
};
