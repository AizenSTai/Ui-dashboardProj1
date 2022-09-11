// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { useRouter } from 'next/router'
// ** Loader Import
import NProgress from 'nprogress'
import jwt from 'jwt-decode'
//
// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import reaction, { createContext, useEffect, useState } from 'react'
// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
// ** Global css styles

import '../../styles/globals.css'
const clientSideEmotionCache = createEmotionCache()
// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  const [info, setInfo] = useState({
    username: '',
    email: '',
    namefa: '',
    nationalCode: '',
    rolenamefa: '',
    userStatus: ''
  })
  const [valid, setValid] = useState(true)
  useEffect(async () => {
    // const validtoken = localStorage.getItem('token')
    // if (validtoken.length > 10) {
    //   const Decoded = jwt(validtoken)
    //   const date = Math.floor(new Date().getTime() / 1000.0)
    //   console.log(date + '/n' + Decoded.exp)
    //   if (Decoded.exp <= date) {
    //     router.push('/pages/login')
    //   }
    // } else {
    //   router.push('/pages/login')
    //
    // }
    // const token = localStorage.getItem('token')
    // if (token != null && token != undefined) {
    //   const Send = await fetch('http://nodex.microsis.net/user/Profile', {
    //     method: 'POST',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-type': 'application/json',
    //       'Access-Control-Allow-Headers': 'Content-Type',
    //       'Access-Control-Allow-Methods': 'POST',
    //       'Access-Control-Allow-Headers': 'X-Requested-With',
    //       Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    //   const Response = await Send.json()
    //   console.log(Response)
    //   setInfo(Response.data)
    // }
  }, [])
  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout initdata={info}>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App

// // ** Next Imports
// import react from 'react'
// import Head from 'next/head'
// import { Router } from 'next/router'
// import jwt from 'jwt-decode'
// // ** Loader Import
// import NProgress from 'nprogress'

// // ** Emotion Imports
// import { CacheProvider } from '@emotion/react'

// // ** Config Imports
// import themeConfig from 'src/configs/themeConfig'

// // ** Component Imports
// import UserLayout from 'src/layouts/UserLayout'
// import ThemeComponent from 'src/@core/theme/ThemeComponent'

// // ** Contexts
// import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// // ** Utils Imports
// import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// // ** React Perfect Scrollbar Style
// import 'react-perfect-scrollbar/dist/css/styles.css'
// import { useRouter } from 'next/router'
// // ** Global css styles
// import '../../styles/globals.css'
// import { React } from 'mdi-material-ui'

// const clientSideEmotionCache = createEmotionCache()

// // ** Pace Loader
// if (themeConfig.routingLoader) {
//   Router.events.on('routeChangeStart', () => {
//     NProgress.start()
//   })
//   Router.events.on('routeChangeError', () => {
//     NProgress.done()
//   })
//   Router.events.on('routeChangeComplete', () => {
//     NProgress.done()
//   })
// }

// // ** Configure JSS & ClassName
// class App extends react.Component {
//   constructor(props) {
//     super(props)

//     // Variables
//   }
//   // componentDidMount() {
//   //   const validtoken = localStorage.getItem('token')
//   //   if (validtoken.length > 10) {
//   //     const Decoded = jwt(validtoken)
//   //     console.log(Decoded)
//   //     router.push('/')
//   //   } else {
//   //   }
//   // }
//   render() {
//     const router = useRouter()
//     const { Component, emotionCache = clientSideEmotionCache, pageProps } = this.props
//     const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

//     return (
//       <CacheProvider value={emotionCache}>
//         <Head>
//           <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
//           <meta
//             name='description'
//             content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
//           />
//           <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
//           <meta name='viewport' content='initial-scale=1, width=device-width' />
//         </Head>

//         <SettingsProvider>
//           <SettingsConsumer>
//             {({ settings }) => {
//               return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
//             }}
//           </SettingsConsumer>
//         </SettingsProvider>
//       </CacheProvider>
//     )
//   }
// }

// export default App
