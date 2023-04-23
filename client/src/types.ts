export type Post = {
  id: string;
  text: string;
  user: {
    sub: string;
    name?: string;
  };
};
