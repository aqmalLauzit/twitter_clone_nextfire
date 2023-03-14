export default function CommentsComponent({comment,id}) {
  return (
    <div>
      {comment?.data()?.comment}
      </div>
  )
}
