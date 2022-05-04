class Message < ApplicationRecord
  belongs_to :user
  has_many :likes

  validates :content, presence: true

  def self.all_array
    messages_array = includes(:user, [likes: :user]).map do |message|
      {
        id: message.id,
        user_id: message.user.id,
        name: message.user.name,
        content: message.content,
        email: message.user.email,
        created_at: message.created_at,
        likes: message.likes.map { |like| { id: like.id, email: like.user.email }  }
      }
    end
  end
end
