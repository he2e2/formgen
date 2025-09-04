export interface GuideSection {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface GuideCategory {
  id: string;
  title: string;
  description: string;
  sections: GuideSection[];
}
