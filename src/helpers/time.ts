import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export function timeFromNow(datetime: string): string {
  return formatDistanceToNow(new Date(datetime), { addSuffix: true })
}