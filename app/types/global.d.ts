declare module "swipper/css"

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
  raw_content: string | null;
  favicon: string;
  images: {
    url: string;
    description: string;
  }[];
}