class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  has_many :lists
  has_many :items, through: :lists       

 	def self.from_omniauth(auth)
 		where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
 			user.provider = auth.provider
 			user.username = auth.info.name
 			user.uid = auth.uid
 			user.email = auth.info.email
 			user.password = Devise.friendly_token[0,20]
 			user.save
 		end
 	end

 
end
