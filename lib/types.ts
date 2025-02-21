export interface Book {
  id: number
  title: string
  author: string
  coverImage: string
}

export interface OneBook extends Book{
  summary: string
  comments: Array<{
      auteur: string,
      contenu: Array<any>
      createdAt: string,
  }>
}

export interface BookApi {
  couverture:Array<
      {
        id: number,
        formats: {
          thumbnail: {
            url: string,
          },
        }
      }>,
  auteur: string,
  created_at:string,
  id: number
  documentId: number
  isbn: string
  published_at: string
  titre: string
  updated_at: string
}
export interface OneBookApi extends BookApi {
    description: string
    commentaires: Array<{
        auteur: string,
        contenu: Array<any>
        createdAt: string,
    }>
}
