import Ably from "./Ably"


export default function CommentBox() {
  
  function handleAddComment(event: any) {
    event.preventDefault()
    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = event.target.comment.value.trim()
    const name = event.target.name.value.trim()
    
    // Get the current time.
    const timestamp = Date.now()
    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment, timestamp }
      // Publish comment
      const channel = Ably.channels.get("comments")
      channel.publish("add_comment", commentObject, (err: Error) => {
        if (err) {
          console.log("Unable to publish message err = " + err.message)
        }
      })
      // Clear input fields
      event.target.name.value = ""
      event.target.comment.value = ""
    }
  }
  
  
  return (
    <div>
      <h1 className="title">Please leave your feedback below</h1>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
        />
        <textarea name="comment" placeholder="Add a comment"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
