import React, { useState } from "react";

const Post = () => {
    let [ postData, setPostData ] = useState({});

    return (
        <div>
            This is a single post page! Once I complete the API segment that fetches this data there will be some more stuff here!
        </div>
    )
}

export default Post;