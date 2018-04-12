module Abilities
  class ParalegalAbility
    include CanCan::Ability

    def initialize(user)
      user ||= User.new
      can :manage, User, id: user.id
      can :manage, Client
      can :manage, Case
      can :manage, Comment
      can :manage, Task
    end
  end
end
