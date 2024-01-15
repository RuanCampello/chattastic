export function formatTime(date: Date) {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (60 * 1000))

  if (diffInMinutes <= 1) {
    return 'Just now'
  } else if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    // Today
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  } else if (
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    // Yesterday
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  } else {
    // Older than yesterday
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return `${formattedDate} at ${formattedTime}`
  }
}

export function isImageFile(file: File) {
  const acceptedImageTypes = ['image/jpeg', 'image/png']
  return file && acceptedImageTypes.includes(file.type)
}