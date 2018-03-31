module Abilities
  class AttorneyAbility
    include CanCan::Ability

    def initialize(user)
      user ||= User.new
      # can :manage, User, id: user.id
      # can :manage, Client
      # can :manage, Case
      # can :manage, Comment
      # can :manage, Task
      can :manage, :all
    end
  end
end
