import React, { PureComponent } from 'react'
import { CommentSection } from "react-comments-section";
// import 'react-comments-section/dist/index.css'

class Comment extends PureComponent {
    state = {
      data: []
    }
  
    onSubmitAction = (data) => {
      console.log('this comment was posted!',data)
    }
  
    customNoComment = () => <div className='no-com' >No Comment</div>
  
    render() {
      return(
          <CommentSection
            currentUser={{
              currentUserId: '01a',
              currentUserImg:
                'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
              currentUserProfile:'',
              currentUserFullName: 'Anh'
            }}
            commentData={this.state.data}
            onSubmitAction={(data) => this.onSubmitAction(data)}
            customNoComment={() => this.customNoComment()}
            logIn={{
              loginLink: 'http://localhost:3001/',
              signupLink: 'http://localhost:3001/'
            }}
          />)
    }
  }
  
  export default Comment