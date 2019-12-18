import * as React from 'react';
import { graphql } from 'gatsby';

interface Meta {
  title: string;
}

interface Post {
  html: string;
  frontmatter: Meta;
}

interface Node {
  markdownRemark: Post;
}

interface Props {
  data: Node;
}

export function Post(props: Props) {
  const post = props.data.markdownRemark;
  return (
    <>
      <h1>{post.frontmatter.title}</h1>
      <main dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
}

export default Post;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
