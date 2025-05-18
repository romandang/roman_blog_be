import { JwtPayload, jwtDecode } from 'jwt-decode';
import * as lodash from 'lodash';
import * as moment from 'moment';

export const getUserIdFromJwt = (jwt) => {
  try {
    const { id }: any = jwtDecode<JwtPayload>(jwt);
    return id;
  } catch (error) {
    return '';
  }
};

export const cleanData = (data) => {
  if (typeof data !== 'object' || !data || Array.isArray(data)) return data;
  const newObj = {};

  for (const key of Object.keys(data)) {
    let value = data[key];
    if (value === null) value = '';
    Object.assign(newObj, { [key]: value });
  }

  return newObj;
};

export const _ = lodash;

export const returnEmptyData = (data) => {
  if (!Array.isArray(data)) throw new Error('Your data is not type array');

  if (lodash.isEmpty(data)) return [];
  return data;
};

export const pickFieldsOnArrayObject = (
  data: Array<Object>,
  fieldsToPick: Array<Object>,
) => {
  const currentData = [];

  data.forEach((item) => {
    const currentItem = lodash.pick(item, fieldsToPick);
    currentData.push(currentItem);
  });

  return currentData;
};

export const formatDate = (date) => {
  return moment(date).format('MMMM D, YYYY');
};

export const formatDateFromNow = (date) => {
  return moment(date).fromNow();
};

export const formatCommentResponse = (data, CMS_URL = '') => {
  if (!Array.isArray(data)) return [];

  const format = (item) => ({
    ..._.omit(item, [
      'author',
      'userId',
      'createdAt',
      'updatedAt',
      'publishedAt',
    ]),
    createdDate: formatDateFromNow(item.publishedAt),
    authorName: item.author?.authorName ?? 'Admin',
    authorAvatar: item.author?.avatar?.url
      ? `${CMS_URL}${String(item.author?.avatar?.url)}`
      : 'https://picsum.photos/835/835',
    authorUrl: item.author?.id ? `/${item.author?.id}` : '',
  });

  return data?.map((item) => {
    return {
      ...format(item),
      replyComments: item.replyComments.map((replyComment) => {
        return {
          ...format(replyComment),
        };
      }),
    };
  });
};

export const formatArticleResponse = (article: any, CMS_URL = '') => {
  return {
    ...article,
    imageUrl: article.thumbnail?.url
      ? `${CMS_URL}${String(article.thumbnail?.url)}`
      : 'https://picsum.photos/1170/835',
    categoryName: article.categoryId?.name ?? 'Default',
    categoryUrl: article.categoryId?.slug ?? '/',
    datePublished: formatDate(article.publishedAt),
    pathAlias: article.slug ?? '/',
    createdDate: formatDateFromNow(article.publishedAt),
    author: {
      id: article.author?.id,
      name: article.author?.authorName ?? 'Admin',
      avatar: article.author?.avatar?.url
        ? `${CMS_URL}${String(article.author?.avatar?.url)}`
        : 'https://picsum.photos/1170/835',
      url: article.author?.id ? `/${article.author?.id}` : '',
    },
    timeReading: `${article.timeReading || 1} min to read`,
    content: article.content,
  };
};
