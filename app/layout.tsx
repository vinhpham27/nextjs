// These styles apply to every route in the application
import './global.css'

function MainLayout( { children } : {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default MainLayout;