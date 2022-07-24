import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'

import * as S from './styles'

type Props = {
  disabled: boolean
  postTitle: string
}

const ShareButtons: FC<Props> = ({ disabled, postTitle }) => {
  const { t } = useTranslation()

  return (
    <S.ShareContainer>
      <EmailShareButton
        subject={postTitle}
        disabled={disabled}
        body={t('sharePostText')}
        separator=" - "
        url={window.location.href}
      >
        <EmailIcon size={30} />
      </EmailShareButton>
      <FacebookShareButton
        quote={t('sharePostText')}
        hashtag="#cluster"
        disabled={disabled}
        url={window.location.href}
      >
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <LinkedinShareButton
        title={postTitle}
        summary={t('sharePostText')}
        source="Cluster"
        disabled={disabled}
        url={window.location.href}
      >
        <LinkedinIcon size={30} />
      </LinkedinShareButton>
      <RedditShareButton
        title={postTitle}
        disabled={disabled}
        url={window.location.href}
      >
        <RedditIcon size={30} />
      </RedditShareButton>
      <TelegramShareButton
        title={postTitle}
        disabled={disabled}
        url={window.location.href}
      >
        <TelegramIcon size={30} />
      </TelegramShareButton>
      <TwitterShareButton
        title={postTitle}
        via="Cluster"
        hashtags={['#cluster']}
        disabled={disabled}
        url={window.location.href}
      >
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <WhatsappShareButton
        title={postTitle}
        separator=" - "
        disabled={disabled}
        url={window.location.href}
      >
        <WhatsappIcon size={30} />
      </WhatsappShareButton>
    </S.ShareContainer>
  )
}
export default ShareButtons
