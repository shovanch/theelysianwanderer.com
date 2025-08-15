export type TocHeading = {
  depth: number;
  slug: string;
  text: string;
  children?: TocHeading[];
};

export type TocProps = {
  headings: TocHeading[];
};
