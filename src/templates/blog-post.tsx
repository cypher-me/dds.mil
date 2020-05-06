import React from "react";
import { graphql } from "gatsby";
import { Layout, Section, Sidebar, SidebarSection, SEO } from "components";

interface Props {
  data: {
    markdownRemark: {
      html: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        date: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
      };
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
}

const BlogPostPage: React.FC<Props> = ({
  data: { markdownRemark, pagesJson },
}) => {
  const { html, frontmatter } = markdownRemark;
  const { sidenav } = pagesJson;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <SidebarSection sidebar={<Sidebar menu={sidenav.menu} includeSocial />}>
        <Section className="dds-post-page-section">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Section>
      </SidebarSection>
    </Layout>
  );
};

export default BlogPostPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { type: { eq: "blogPost" } }
    ) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
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
