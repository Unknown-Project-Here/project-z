<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \App\Enums\CategoryEnum $name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Option> $options
 * @property-read int|null $options_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $recipient_id
 * @property string|null $text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $image_url
 * @property-read string $time
 * @property-read \App\Models\User $recipient
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereRecipientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUserId($value)
 */
	class Message extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property-read \App\Models\Category $category
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option whereName($value)
 */
	class Option extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property array<array-key, mixed>|null $contact
 * @property bool $is_active
 * @property string|null $skill_level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $repo_id
 * @property-read mixed $creator
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProjectInvitation> $invitations
 * @property-read int|null $invitations_count
 * @property-read \App\Models\ProjectUser|null $pivot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProjectTechStack> $stack
 * @property-read int|null $stack_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project active()
 * @method static \Database\Factories\ProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereRepoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSkillLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUserId($value)
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $project_id
 * @property int $inviter_id
 * @property int $invitee_id
 * @property string $role
 * @property string $token
 * @property \Illuminate\Support\Carbon $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $invitee
 * @property-read \App\Models\User $inviter
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereInviteeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereInviterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectInvitation whereUpdatedAt($value)
 */
	class ProjectInvitation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project $project
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectRequest whereUserId($value)
 */
	class ProjectRequest extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $project_id
 * @property int $option_id
 * @property \App\Enums\SkillLevelEnum|null $skill_level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Option $option
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereOptionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereSkillLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectTechStack whereUpdatedAt($value)
 */
	class ProjectTechStack extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property \App\Enums\ProjectRole $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectUser whereUserId($value)
 */
	class ProjectUser extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $username
 * @property string $provider
 * @property string $provider_id
 * @property string|null $access_token
 * @property string|null $refresh_token
 * @property \Illuminate\Support\Carbon|null $token_expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereRefreshToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereTokenExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialAccount whereUsername($value)
 */
	class SocialAccount extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $username
 * @property string $email
 * @property bool $onboarded
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $skill_level
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $avatar
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProjectRequest> $projectRequests
 * @property-read int|null $project_requests_count
 * @property-read \App\Models\ProjectUser|null $pivot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\SocialAccount> $socialAccounts
 * @property-read int|null $social_accounts_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserTechStack> $techStack
 * @property-read int|null $tech_stack_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereOnboarded($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereSkillLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $option_id
 * @property \App\Enums\SkillLevelEnum|null $skill_level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Option $option
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereOptionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereSkillLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserTechStack whereUserId($value)
 */
	class UserTechStack extends \Eloquent {}
}

