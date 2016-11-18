import React from 'react';
import {withApollo} from 'react-apollo';
import truncatise from 'truncatise';
import getPostBySlug from '/imports/api/post-by-slug-gql';

import FadeInImage from './FadeInImage.jsx';


const PostSummary = ({post, client}) => {
  const getUrl = () => {
    // console.log(post.categories)
    const cat = post.categories[0].slug;
    return `/article/${cat}/${post.slug}`;
  }
  const prefetchPost = () => {
    client.query({
      query: getPostBySlug,
      variables: {slug: post.slug}
    })

  }
  return(
    <a href={getUrl()} onMouseOver={prefetchPost}>
      <article>
        <FadeInImage size="100%" className="bg-image" src={post.featured_media_url} />
        <div className="post-content">
          <h3 role="heading" id={`#${post.slug}`} dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          <p dangerouslySetInnerHTML={{__html: truncatise(post.excerpt.rendered, {TruncateLength:40})}} />
        </div>
      </article>
    </a>
  )
}

export default withApollo(PostSummary);
