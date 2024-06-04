import OpenJobs from '@/assets/svgs/OpenJobs.svg';
import Companies from '@/assets/svgs/Companies.svg';
import Specialists from '@/assets/svgs/Specialists.svg';
import Blog from '@/assets/svgs/Blog.svg';

export const LinksArr = [
  {
    id: 1,
    text: "Open jobs",
    withCount: true,
    disabled: false,
    count: 32,
    link: "/vacancies",
    logoUrl: OpenJobs
  },
  {
    id: 2,
    text: "Companies",
    withCount: false,
    disabled: false,
    count: null,
    link: "/companies",
    logoUrl: Companies
  },
  {
    id: 4,
    text: "Specialists",
    withCount: false,
    disabled: true,
    count: null,
    logoUrl: Specialists
  },
  {
    id: 5,
    text: "Blog",
    withCount: false,
    disabled: false,
    count: null,
    logoUrl: Blog
  },
];
