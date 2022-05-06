import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import Iconsimg from '../Containers/Utils/Img'
const Brand = ({ height, width, mode }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Iconsimg.logoflex} resizeMode={mode} />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default Brand
