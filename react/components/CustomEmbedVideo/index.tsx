import React from 'react'
import { schema } from './schema/schema'
import { BBB } from './interfaces/interfaces'

import './global.css'

const CustomEmbedVideo = ({ enableComponent = false, video }: BBB) => {
  return (
    enableComponent && (
      <div className="custom-embed-video">
        <iframe width="1260" height="700" src={video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </div>
    )
  )
}

CustomEmbedVideo.getSchema = () => schema;

export default CustomEmbedVideo;
