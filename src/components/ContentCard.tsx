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

export default ({ title, description, titleUrl, avatarUrl, loading }: CardProps) => 
  <Card style={{ width: 300, marginTop: 16 }} loading={loading} hoverable={ true }>
    <Meta
      avatar={
        <Avatar src={ avatarUrl } />
      }
      title={ 
        titleUrl
        ? <a href={ titleUrl }>{ title }</a>
        : title
      }
      description={ description }
    />
  </Card>