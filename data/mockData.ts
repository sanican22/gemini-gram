import { User, Post, Story, Conversation } from '../types';

export const users: User[] = [
  { id: 1, username: 'dev_dreamer', avatar: 'https://picsum.photos/seed/user1/100/100', bio: 'Matrisin içinde kodluyorum. Kahve & klavyeler.', postsCount: 3, followers: 1337, following: 42 },
  { id: 2, username: 'pixel_artist', avatar: 'https://picsum.photos/seed/user2/100/100', bio: 'Her seferinde bir piksel dünya yaratıyorum.', postsCount: 2, followers: 2048, following: 128 },
  { id: 3, username: 'nature_nomad', avatar: 'https://picsum.photos/seed/user3/100/100', bio: 'WiFi\'nin zayıf olduğu yerlerde dolaşıyorum.', postsCount: 2, followers: 5821, following: 210 },
  { id: 100, username: 'Gemini Asistan', avatar: 'https://i.imgur.com/3f5K3v2.png', bio: 'Yapay zeka yardımcınız.', postsCount: 0, followers: 9999, following: 1, isBot: true },
];

export const stories: Story[] = users.filter(u => !u.isBot).map((user, index) => ({
  id: index + 1,
  user: { username: user.username, avatar: user.avatar },
  imageUrl: `https://picsum.photos/seed/story${index+1}/400/700`,
}));

export const posts: Post[] = [
  {
    id: 1,
    user: users[0],
    imageUrl: 'https://picsum.photos/seed/post1/600/800',
    caption: 'Sonunda yeni kurulumu çalıştırdım! Monitörlerin parıltısı ihtiyacım olan tek ışık. #GeliştiriciHayatı #Kodİstasyonu',
    likes: 152,
    comments: [
      { id: 1, user: { username: 'pixel_artist' }, text: 'Harika kurulum! 🔥' },
      { id: 2, user: { username: 'nature_nomad' }, text: 'Karmaşık görünüyor!' },
    ],
    timestamp: '2 saat önce',
    isLikedByCurrentUser: false,
  },
  {
    id: 2,
    user: users[2],
    imageUrl: 'https://picsum.photos/seed/post2/600/750',
    caption: 'Şelaleleri kovalıyorum ve son teslim tarihlerimi unutuyorum. Buna değer. #MaceraZamanı #DahaFazlaKeşfet',
    likes: 789,
    comments: [
      { id: 3, user: { username: 'dev_dreamer' }, text: 'Şu an çok kıskandım.' },
    ],
    timestamp: '5 saat önce',
    isLikedByCurrentUser: false,
  },
  {
    id: 3,
    user: users[1],
    imageUrl: 'https://picsum.photos/seed/post3/600/600',
    caption: 'En son karakter tasarımım. Adını ne koymalıyız? #PikselSanatı #OyunGeliştirme',
    likes: 321,
    comments: [
       { id: 4, user: { username: 'dev_dreamer' }, text: 'Harika görünüyor, "Arya" nasıl?' },
       { id: 5, user: { username: 'nature_nomad' }, text: 'Vay canına!' },
    ],
    timestamp: '1 gün önce',
    isLikedByCurrentUser: false,
  },
    {
    id: 4,
    user: users[0],
    imageUrl: 'https://picsum.photos/seed/post4/600/700',
    caption: 'Derin düşünceler içinde, özellikle zorlu bir mantık parçasını ayıklıyorum. Hatayı bulmanın tatmini eşsiz.',
    likes: 98,
    comments: [],
    timestamp: '2 gün önce',
    isLikedByCurrentUser: false,
  },
  {
    id: 5,
    user: users[2],
    imageUrl: 'https://picsum.photos/seed/post5/600/850',
    caption: 'Zirveden gün doğumu. Dünya buradan çok sessiz ve potansiyel dolu hissettiriyor.',
    likes: 1204,
    comments: [
        { id: 6, user: { username: 'pixel_artist' }, text: 'Kesinlikle nefes kesici bir çekim.' },
    ],
    timestamp: '3 gün önce',
    isLikedByCurrentUser: false,
  },
   {
    id: 6,
    user: users[1],
    imageUrl: 'https://picsum.photos/seed/post6/600/650',
    caption: 'Yaptığım şirin bir piksel sanat kafe. Keşke burada bir kahve içebilsem!',
    likes: 450,
    comments: [],
    timestamp: '4 gün önce',
    isLikedByCurrentUser: false,
  },
   {
    id: 7,
    user: users[0],
    imageUrl: 'https://picsum.photos/seed/post7/600/750',
    caption: 'Maraton bir kodlama seansı için sadece basit bir fincan kahve. #KafeinleÇalışır',
    likes: 112,
    comments: [],
    timestamp: '5 gün önce',
    isLikedByCurrentUser: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: 1,
    participantIds: [1, 2], // dev_dreamer and pixel_artist
    messages: [
      { id: 1, senderId: 1, text: 'Harika kurulum! 🔥', timestamp: '1 saat önce' },
      { id: 2, senderId: 2, text: 'Teşekkürler! Senin son piksel sanatını gördüm, inanılmaz.', timestamp: '55 dakika önce' },
      { id: 3, senderId: 1, text: 'Sağ ol! Belki bir sonraki oyunumuz için işbirliği yapabiliriz?', timestamp: '50 dakika önce' },
    ],
  },
  {
    id: 2,
    participantIds: [1, 3], // dev_dreamer and nature_nomad
    messages: [
      { id: 1, senderId: 3, text: 'Gönderindeki şelale neresi? Muhteşem görünüyor!', timestamp: '3 saat önce' },
      { id: 2, senderId: 1, text: 'Orası İzlanda\'da. Kesinlikle gitmelisin.', timestamp: '2 saat önce' },
    ],
  },
];