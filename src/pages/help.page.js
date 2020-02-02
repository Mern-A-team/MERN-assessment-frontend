import React, { Component } from 'react'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/help.page.scss'

export default class Help extends Component {
  render() {
    return (
      <>
        <SideNav />
        <StaticNav />
        <h1>Welcome to the Help page.</h1>

        <h3 id="help-title">Home</h3>
        <p id="help-content">
          By clicking on Home or the home icon you will return to the dashboard you encounter upon a successful login. From Home you can view the statistics of how many photos your database holds, how many categories you have created, as well as an easy list of options for you to navigate through the app. These same options can be found on the navigation bar to the left. If you would like to better understand the icons on the navigation bar, click the arrow at the centre and it will expand with icon descriptions. Click the arrow again to minimise the navigation bar.
        </p>
        <h3 id="help-title">Login</h3>
        <p id="help-content">
          Users must login. This is a private app used to access a private database. Therefore, the login regulates who has access. If you do not know your login or you have questions about the process, please speak to a museum administrator.
        </p>
        <h3 id="help-title">Users</h3>
        <p id="help-content">
          Depending on your role with the museum, your login will have set permissions. These permissions are set by the Admin user. If you needed added permissions, please speak to your administrator and they may be able to edit your settings.
        </p>
        <h3 id="help-title">Admin Information</h3>
        <p id="help-content">
          The Administrator role has added permissions that enable them to edit / delete users as well as edit / delete categories. The Admin can view and edit Users under the user icon at the bottom of the navigation bar. Admin will have an edit and delete button next to each user that is not available to other users. The Admin can access, edit, and delete categories by using the Category icon on the navigation bar. This will display a list of all categories. Similarly, there will be an edit and delete button next to each category name.
        </p>
        <h3 id="help-title">Categories</h3>
        <p id="help-content">
          A user can view all categories used within the database via the side navigation bar. The icon  resembling a set of books will take them to a complete list. Only an Admin can edit or delete categories.
        </p>
        <h3 id="help-title">Searching Descriptions</h3>
        <p id="help-content">
          Using the search function accessed via the magnifying glass icon enables you search the captions entered in conjunction with a photo. When you type a word in the search box you will need to click the ‘search’ button to return your results. These results will contain any matches from within all captions in the database. Note: Searching with the text box is different than searching with categories.
        </p>
        <h3 id="help-title">Searching Categories</h3>
        <p id="help-content">
          Under the search function accessed by the magnifying glass icon you have the option to select categories. Selecting one or more categories will filter the images returned and you will be able to browse all images in the selected groups. Note: This function is different from searching a caption.
        </p>
        <h3 id="help-title">Adding a Photo</h3>
        <p id="help-content">
          When you add a photo to the database you will be prompted to fill in a number of fields; name, ID number, location, description, categories, and finally selecting the file to upload. Name, Id number, category, description and image are all required. You are be able to select a number of categories to apply to each photo. If there is a category you think should apply to your photo but does not appear in the drop down list, please talk to a museum administrator. To ensure that your photo is saved to a database, you need to click save. If successful, you will get a ‘success’ notification. If you receive an error, please try again.
        </p>
        <h3 id="help-title">Editing Photo Information</h3>
        <p id="help-content">
          To edit a photo, click on the photo you wish to edit. You will see a button “Edit” and if selected the text will appear as text fields. Once you have edited or changed the text in the text fields, press save and your information will be stored. Note: a Guest does not have permissions to edit database information.
        </p>
        <h3 id="help-title">Deleting a Photo</h3>
        <p id="help-content">
          To delete a photo, click on the photo you wish to delete. You will see a button “Delete”. If this button is clicked, you will be asked to confirm that you want to delete the item. If confirmed, the photo and associated information will be deleted. Note: Volunteers and Guests do not have permissions to delete objects.
        </p>
        <h3 id="help-title">Logout</h3>
        <p id="help-content">
          If you are done with your session, please logout using the icon appearing as a door with an arrow. This helps protect the security of the database information. Logging out ensures that no one can access the database when you leave your work station.
        </p>
      </>
    )
  }
}

