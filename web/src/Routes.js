// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home" roles="user">
        <Set wrap={MainLayout}>
          <Route path="/user-dashboard" page={UserdashboardPage} name="userdashboard" link={'user'} />
        </Set>
      </Private>

      <Private unauthenticated="home" roles="admin">
        <Set wrap={MainLayout}>
          <Route path="/admin-dashboard" page={AdmindashboardPage} name="admindashboard" link={'admin'} />
        </Set>
      </Private>

      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" link={'viewer'} />
        <Route path="/about-us" page={AboutPage} name="about" link={'viewer'} />
        <Route path="/contact-us" page={ContactPage} name="contact" link={'viewer'} />
        <Route path="/login" page={LoginPage} name="login" link={'viewer'} />
        <Route path="/signup" page={SignupPage} name="signup" link={'viewer'} />
        {/* <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" /> */}
        {/* <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" /> */}
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
