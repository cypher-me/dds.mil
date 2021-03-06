import React from "react";
import { graphql } from "gatsby";
import {
  Layout,
  NewsArticleItem,
  Section,
  SidebarSection,
  Sidebar,
  SEO,
  Paginator,
} from "components";

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: {
        frontmatter: {
          title: string;
          link: string;
          date: string;
        };
      }[];
    };
    pagesJson: {
      sidenav: {
        menu: {
          text: string;
          link: string;
        }[];
      };
    };
  };
  pageContext: {
    link: string;
    currentPage: number;
    numPages: number;
    basePage: string;
  };
}

const NewsList: React.FC<Props> = ({
  data: {
    allMarkdownRemark: { nodes },
    pagesJson: { sidenav },
  },
  pageContext,
}) => {
  return (
    <Layout>
      <SEO title={"News"} url={pageContext.link} />
      <SidebarSection sidebar={<Sidebar menu={sidenav.menu} includeSocial />}>
        <Section className="post-list-section">
          {nodes.map(({ frontmatter }) => (
            <NewsArticleItem key={frontmatter.title} {...frontmatter} />
          ))}
          <Paginator {...pageContext} />
        </Section>
      </SidebarSection>
    </Layout>
  );
};

export default NewsList;

export const query = graphql`
  query newsListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { type: { eq: "news" } } }
    ) {
      nodes {
        frontmatter {
          title
          link
          outlet
          date(formatString: "MMM DD, YYYY")
        }
      }
    }

    pagesJson(navigation: { link: { eq: "/media" } }) {
      sidenav {
        menu {
          text
          link
        }
      }
    }
  }
`;
