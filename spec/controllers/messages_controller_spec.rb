require 'rails_helper'

describe MessagesController do
# letを利用してテスト中使用するインスタンスを定義
  let(:user) { create(:user) }
  let(:group) { create(:group) }
  
  describe '#index' do
  # ログインしている場合
    context 'log in' do
      before do
        login user  # controller_macros.rb内のloginメソッドを呼び出し 
        get :index, params: { group_id: group.id } #before_actionでの処理
      end
  # アクション内で定義しているインスタンス変数があるか
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
  # 該当するビューが描画されているか
      it 'renders the :index template' do
        expect(response).to render_template :index
      end
    end
    # ログインしていない場合
    context 'not log in' do
      # ログインしていないので、loginメソッド飛び出しはしない
      before do
        get :index, params: { group_id: group.id }
      end
# 意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      # ログインしているかつ、保存に成功した場合
      context 'can save' do
        subject {
          post :create,
          params: params
        }
        # メッセージの保存はできたのか
        it 'count up message' do
        expect{ subject }.to change(Message, :count).by(1)
        end
        # 意図した画面に遷移しているか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params){ { group_id: group.id,user_id: user.id, message: attributes_for(:message, text: nil, image: nil) } }
        
        subject{
          post :create,
          params: invalid_params
        }
        # メッセージの保存は行われなかったか
        it 'not count up message' do
          expect{ subject }.not_to change(Message, :count)
        end
        # 意図したビューが描画されているか
        it 'redirects to index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    # ログインしていない場合
    context 'not log in' do
      # 意図した画面にリダイレクトできているか
      it 'redirect to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
 end
end

 







