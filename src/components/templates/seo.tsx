import { constants } from '@src/lib';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
  isArticle: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  userName?: string;
  tag?: string;
}

const PageSEO = ({
  title,
  description,
  isArticle,
  publishedTime,
  modifiedTime,
  userName,
  tag,
}: Props) => {
  return (
    <Helmet prioritizeSeoTags>
      <meta name='robots' content='index,follow' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@iamprincemuel' />
      <meta name='twitter:creator' content='@iamprincemuel' />

      <title>{constants.RENDER_TITLE_META_TAG(title)}</title>
      <meta
        property='description'
        content={constants.RENDER_DESC_META_TAG(description)}
      />

      <meta
        property='og:title'
        content={constants.RENDER_TITLE_META_TAG(title)}
      />
      <meta
        property='og:description'
        content={constants.RENDER_DESC_META_TAG(description)}
      />
      <meta property='og:image' content={constants.DEFAULT_SITE_LOGO} />
      <meta property='og:image:type' content='image/svg+xml' />
      <meta property='og:image:width' content='400' />
      <meta property='og:image:height' content='300' />
      <meta property='og:image:alt' content='A three quarter pie' />

      <meta name='og:url' content={`${constants.BASE_URL_PROD}/login`} />
      <meta name='og:type' content={isArticle ? 'article' : 'website'} />
      <meta name='og:locale' content='en_US' />
      <meta name='site_name' content={constants.DEFAULT_TITLE_META_TAG} />

      <link rel='canonical' href={`${constants.BASE_URL_PROD}/login`} />
      <link
        rel='icon'
        type='image/svg+xml'
        href={constants.DEFAULT_SITE_LOGO}
      />

      {isArticle ? (
        <React.Fragment>
          <meta name='article:published_time' content={publishedTime} />
          <meta name='article:modified_time' content={modifiedTime} />
          <meta name='article:author' content={userName} />
          <meta name='article:tag' content={tag} />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </Helmet>
  );
};

export { PageSEO };
