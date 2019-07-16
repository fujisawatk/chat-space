require 'rails_helper'
describe Message do
  describe '#create' do
# メッセージを保存できる場合
    context 'can save' do
# メッセージがあれば保存できる
      it "If you have s message, you can save it" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end
# 画像があれば保存できる
      it "If you have an image, you can save it" do
        message = build(:message, text: nil)
        expect(message).to be_valid
      end
# メッセージと画像があれば保存できる
      it "If you have a message and an image, you can save it" do
        message = build(:message)
        expect(message).to be_valid
      end
    end
# メッセージを保存できない場合
    context 'can not save' do
# メッセージも画像も無いと保存できない
      it 'is invalid without text and image' do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include('を入力してください')
      end
# group_idが無いと保存できない
      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

# user_idが無いと保存できない
      it 'is invalid without user_id' do
        message = build(:message,user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end