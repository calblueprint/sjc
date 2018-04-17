module Abilities
  class AttorneyAbility
    include CanCan::Ability

    def initialize(user)
      user ||= User.new
      can :manage, User, id: user.id
      can :view, Client
      can :view, Case
      can :view, Comment
      can :Manage, Task
    end
  end
end
