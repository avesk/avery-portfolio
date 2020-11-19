import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

type CardProps = {
  title?: string,
  description?: string,
  titleUrl?: string,
  avatarUrl?: string,
  loading: boolean
}

const defaultDescription = 'More info on my GH!';
export default ({ title, description, titleUrl, avatarUrl, loading }: CardProps) =>
  <Card loading={loading} hoverable={true}>
    <Meta
      avatar={
        <Avatar src={avatarUrl} />
      }
      title={
        titleUrl
          ? <a href={titleUrl}>{title}</a>
          : title
      }
      description={description || defaultDescription}
      style={{ width: 300, height: 200 }}
    />
  </Card>