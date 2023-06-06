import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserWithKeys, UserRoleWithKeys, LiveVideoWithKeys, VideoWithKeys, VideoPaginationWithKeys, VideoSearchResultsWithKeys, ScheduleItemWithKeys, SchedulePaginationWithKeys, OrganizationWithKeys, TochesContext } from '../modules/graphql/types';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type BasicVideoMetadata = {
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  organization: Organization;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Bulletin = {
  __typename?: 'Bulletin';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BulletinInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BulletinPagination = {
  __typename?: 'BulletinPagination';
  items: Array<Bulletin>;
  pageInfo: PaginationInfo;
};

export type LiveVideo = BasicVideoMetadata & {
  __typename?: 'LiveVideo';
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  organization: Organization;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulletin: Bulletin;
  organization: Organization;
  user: UserMutations;
  video: VideoMutations;
};


export type MutationBulletinArgs = {
  bulletin: BulletinInput;
};


export type MutationOrganizationArgs = {
  organization: OrganizationInput;
};

export enum MutationStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type Organization = {
  __typename?: 'Organization';
  brregId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  editor: OrganizationEditor;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latestVideos?: Maybe<Array<Video>>;
  name: Scalars['String']['output'];
  postalAddress: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrganizationEditor = {
  __typename?: 'OrganizationEditor';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type OrganizationInput = {
  brregId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  homepage?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalAddress?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  bulletin: Bulletin;
  bulletins: BulletinPagination;
  organization: Organization;
  schedule: SchedulePagination;
  session: Session;
  video: VideoQueries;
};


export type QueryBulletinArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBulletinsArgs = {
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScheduleArgs = {
  filter: ScheduleFilter;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum RoleType {
  Editor = 'EDITOR',
  Member = 'MEMBER'
}

export type ScheduleFilter = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  start: Scalars['DateTime']['output'];
  video: BasicVideoMetadata;
};

export type SchedulePagination = {
  __typename?: 'SchedulePagination';
  items: Array<ScheduleItem>;
  pageInfo: PaginationInfo;
};

export type Session = {
  __typename?: 'Session';
  authenticated: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roles: Array<UserRole>;
};

export type UserMutationResult = {
  __typename?: 'UserMutationResult';
  status: MutationStatus;
  user?: Maybe<User>;
};

export type UserMutations = {
  __typename?: 'UserMutations';
  login: UserMutationResult;
  logout: UserMutationResult;
  profile: UserMutationResult;
  register: UserMutationResult;
};


export type UserMutationsLoginArgs = {
  input: LoginInput;
};


export type UserMutationsProfileArgs = {
  input: UserProfileInput;
};


export type UserMutationsRegisterArgs = {
  input: RegisterInput;
};

export type UserProfileInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  organization: Organization;
  role: RoleType;
};

export type Video = BasicVideoMetadata & {
  __typename?: 'Video';
  assets: Array<VideoAsset>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  images: VideoImages;
  organization: Organization;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  viewCount?: Maybe<Scalars['Int']['output']>;
};

export type VideoAsset = {
  __typename?: 'VideoAsset';
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type VideoFilter = {
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type VideoImages = {
  __typename?: 'VideoImages';
  thumbLarge: Scalars['String']['output'];
  thumbMedium: Scalars['String']['output'];
  thumbSmall: Scalars['String']['output'];
};

export type VideoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type VideoList = {
  filter?: InputMaybe<VideoFilter>;
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  sort?: InputMaybe<Array<VideoSort>>;
};

export type VideoMutationError = {
  message: Scalars['String']['output'];
};

export type VideoMutationPayload = {
  __typename?: 'VideoMutationPayload';
  error?: Maybe<VideoMutationError>;
  status: MutationStatus;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['ID']['output']>;
};

export type VideoMutations = {
  __typename?: 'VideoMutations';
  create: VideoMutationPayload;
  delete: VideoMutationPayload;
  publish: VideoMutationPayload;
  unpublish: VideoMutationPayload;
  update: VideoMutationPayload;
};


export type VideoMutationsCreateArgs = {
  input: VideoInput;
};


export type VideoMutationsDeleteArgs = {
  videoId: Scalars['ID']['input'];
};


export type VideoMutationsPublishArgs = {
  videoId: Scalars['ID']['input'];
};


export type VideoMutationsUnpublishArgs = {
  videoId: Scalars['ID']['input'];
};


export type VideoMutationsUpdateArgs = {
  input: VideoInput;
};

export type VideoPagination = {
  __typename?: 'VideoPagination';
  items: Array<Maybe<Video>>;
  pageInfo: PaginationInfo;
};

export type VideoQueries = {
  __typename?: 'VideoQueries';
  get: Video;
  list: VideoPagination;
  search: VideoSearchResults;
};


export type VideoQueriesGetArgs = {
  id: Scalars['ID']['input'];
};


export type VideoQueriesListArgs = {
  input: VideoList;
};


export type VideoQueriesSearchArgs = {
  input: VideoSearch;
};

export type VideoSearch = {
  limit?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};

export type VideoSearchResults = {
  __typename?: 'VideoSearchResults';
  count: Scalars['Int']['output'];
  items: Array<Video>;
};

export enum VideoSort {
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  BasicVideoMetadata: ( LiveVideoWithKeys ) | ( VideoWithKeys );
  VideoMutationError: never;
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BasicVideoMetadata: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BasicVideoMetadata']>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']['output']>>;
  Bulletin: ResolverTypeWrapper<DeepPartial<Bulletin>>;
  BulletinInput: ResolverTypeWrapper<DeepPartial<BulletinInput>>;
  BulletinPagination: ResolverTypeWrapper<DeepPartial<BulletinPagination>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars['DateTime']['output']>>;
  Float: ResolverTypeWrapper<DeepPartial<Scalars['Float']['output']>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']['output']>>;
  LiveVideo: ResolverTypeWrapper<LiveVideoWithKeys>;
  LoginInput: ResolverTypeWrapper<DeepPartial<LoginInput>>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationStatus: ResolverTypeWrapper<DeepPartial<MutationStatus>>;
  Organization: ResolverTypeWrapper<OrganizationWithKeys>;
  OrganizationEditor: ResolverTypeWrapper<DeepPartial<OrganizationEditor>>;
  OrganizationInput: ResolverTypeWrapper<DeepPartial<OrganizationInput>>;
  PaginationInfo: ResolverTypeWrapper<DeepPartial<PaginationInfo>>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: ResolverTypeWrapper<DeepPartial<RegisterInput>>;
  RoleType: ResolverTypeWrapper<DeepPartial<RoleType>>;
  ScheduleFilter: ResolverTypeWrapper<DeepPartial<ScheduleFilter>>;
  ScheduleItem: ResolverTypeWrapper<ScheduleItemWithKeys>;
  SchedulePagination: ResolverTypeWrapper<SchedulePaginationWithKeys>;
  Session: ResolverTypeWrapper<DeepPartial<Omit<Session, 'user'> & { user?: Maybe<ResolversTypes['User']> }>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']['output']>>;
  User: ResolverTypeWrapper<UserWithKeys>;
  UserMutationResult: ResolverTypeWrapper<DeepPartial<Omit<UserMutationResult, 'user'> & { user?: Maybe<ResolversTypes['User']> }>>;
  UserMutations: ResolverTypeWrapper<DeepPartial<Omit<UserMutations, 'login' | 'logout' | 'profile' | 'register'> & { login: ResolversTypes['UserMutationResult'], logout: ResolversTypes['UserMutationResult'], profile: ResolversTypes['UserMutationResult'], register: ResolversTypes['UserMutationResult'] }>>;
  UserProfileInput: ResolverTypeWrapper<DeepPartial<UserProfileInput>>;
  UserRole: ResolverTypeWrapper<UserRoleWithKeys>;
  Video: ResolverTypeWrapper<VideoWithKeys>;
  VideoAsset: ResolverTypeWrapper<DeepPartial<VideoAsset>>;
  VideoFilter: ResolverTypeWrapper<DeepPartial<VideoFilter>>;
  VideoImages: ResolverTypeWrapper<DeepPartial<VideoImages>>;
  VideoInput: ResolverTypeWrapper<DeepPartial<VideoInput>>;
  VideoList: ResolverTypeWrapper<DeepPartial<VideoList>>;
  VideoMutationError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['VideoMutationError']>;
  VideoMutationPayload: ResolverTypeWrapper<DeepPartial<Omit<VideoMutationPayload, 'video'> & { video?: Maybe<ResolversTypes['Video']> }>>;
  VideoMutations: ResolverTypeWrapper<DeepPartial<Omit<VideoMutations, 'create' | 'delete' | 'publish' | 'unpublish' | 'update'> & { create: ResolversTypes['VideoMutationPayload'], delete: ResolversTypes['VideoMutationPayload'], publish: ResolversTypes['VideoMutationPayload'], unpublish: ResolversTypes['VideoMutationPayload'], update: ResolversTypes['VideoMutationPayload'] }>>;
  VideoPagination: ResolverTypeWrapper<VideoPaginationWithKeys>;
  VideoQueries: ResolverTypeWrapper<DeepPartial<Omit<VideoQueries, 'get' | 'list' | 'search'> & { get: ResolversTypes['Video'], list: ResolversTypes['VideoPagination'], search: ResolversTypes['VideoSearchResults'] }>>;
  VideoSearch: ResolverTypeWrapper<DeepPartial<VideoSearch>>;
  VideoSearchResults: ResolverTypeWrapper<VideoSearchResultsWithKeys>;
  VideoSort: ResolverTypeWrapper<DeepPartial<VideoSort>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BasicVideoMetadata: ResolversInterfaceTypes<ResolversParentTypes>['BasicVideoMetadata'];
  Boolean: DeepPartial<Scalars['Boolean']['output']>;
  Bulletin: DeepPartial<Bulletin>;
  BulletinInput: DeepPartial<BulletinInput>;
  BulletinPagination: DeepPartial<BulletinPagination>;
  DateTime: DeepPartial<Scalars['DateTime']['output']>;
  Float: DeepPartial<Scalars['Float']['output']>;
  ID: DeepPartial<Scalars['ID']['output']>;
  Int: DeepPartial<Scalars['Int']['output']>;
  LiveVideo: LiveVideoWithKeys;
  LoginInput: DeepPartial<LoginInput>;
  Mutation: {};
  Organization: OrganizationWithKeys;
  OrganizationEditor: DeepPartial<OrganizationEditor>;
  OrganizationInput: DeepPartial<OrganizationInput>;
  PaginationInfo: DeepPartial<PaginationInfo>;
  Query: {};
  RegisterInput: DeepPartial<RegisterInput>;
  ScheduleFilter: DeepPartial<ScheduleFilter>;
  ScheduleItem: ScheduleItemWithKeys;
  SchedulePagination: SchedulePaginationWithKeys;
  Session: DeepPartial<Omit<Session, 'user'> & { user?: Maybe<ResolversParentTypes['User']> }>;
  String: DeepPartial<Scalars['String']['output']>;
  User: UserWithKeys;
  UserMutationResult: DeepPartial<Omit<UserMutationResult, 'user'> & { user?: Maybe<ResolversParentTypes['User']> }>;
  UserMutations: DeepPartial<Omit<UserMutations, 'login' | 'logout' | 'profile' | 'register'> & { login: ResolversParentTypes['UserMutationResult'], logout: ResolversParentTypes['UserMutationResult'], profile: ResolversParentTypes['UserMutationResult'], register: ResolversParentTypes['UserMutationResult'] }>;
  UserProfileInput: DeepPartial<UserProfileInput>;
  UserRole: UserRoleWithKeys;
  Video: VideoWithKeys;
  VideoAsset: DeepPartial<VideoAsset>;
  VideoFilter: DeepPartial<VideoFilter>;
  VideoImages: DeepPartial<VideoImages>;
  VideoInput: DeepPartial<VideoInput>;
  VideoList: DeepPartial<VideoList>;
  VideoMutationError: ResolversInterfaceTypes<ResolversParentTypes>['VideoMutationError'];
  VideoMutationPayload: DeepPartial<Omit<VideoMutationPayload, 'video'> & { video?: Maybe<ResolversParentTypes['Video']> }>;
  VideoMutations: DeepPartial<Omit<VideoMutations, 'create' | 'delete' | 'publish' | 'unpublish' | 'update'> & { create: ResolversParentTypes['VideoMutationPayload'], delete: ResolversParentTypes['VideoMutationPayload'], publish: ResolversParentTypes['VideoMutationPayload'], unpublish: ResolversParentTypes['VideoMutationPayload'], update: ResolversParentTypes['VideoMutationPayload'] }>;
  VideoPagination: VideoPaginationWithKeys;
  VideoQueries: DeepPartial<Omit<VideoQueries, 'get' | 'list' | 'search'> & { get: ResolversParentTypes['Video'], list: ResolversParentTypes['VideoPagination'], search: ResolversParentTypes['VideoSearchResults'] }>;
  VideoSearch: DeepPartial<VideoSearch>;
  VideoSearchResults: VideoSearchResultsWithKeys;
}>;

export type BasicVideoMetadataResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['BasicVideoMetadata'] = ResolversParentTypes['BasicVideoMetadata']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LiveVideo' | 'Video', ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type BulletinResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Bulletin'] = ResolversParentTypes['Bulletin']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BulletinPaginationResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['BulletinPagination'] = ResolversParentTypes['BulletinPagination']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Bulletin']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LiveVideoResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['LiveVideo'] = ResolversParentTypes['LiveVideo']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  bulletin?: Resolver<ResolversTypes['Bulletin'], ParentType, ContextType, RequireFields<MutationBulletinArgs, 'bulletin'>>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationOrganizationArgs, 'organization'>>;
  user?: Resolver<ResolversTypes['UserMutations'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['VideoMutations'], ParentType, ContextType>;
}>;

export type OrganizationResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  brregId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editor?: Resolver<ResolversTypes['OrganizationEditor'], ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latestVideos?: Resolver<Maybe<Array<ResolversTypes['Video']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganizationEditorResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['OrganizationEditor'] = ResolversParentTypes['OrganizationEditor']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationInfoResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['PaginationInfo'] = ResolversParentTypes['PaginationInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bulletin?: Resolver<ResolversTypes['Bulletin'], ParentType, ContextType, RequireFields<QueryBulletinArgs, 'id'>>;
  bulletins?: Resolver<ResolversTypes['BulletinPagination'], ParentType, ContextType, RequireFields<QueryBulletinsArgs, 'page' | 'perPage'>>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<QueryOrganizationArgs, 'id'>>;
  schedule?: Resolver<ResolversTypes['SchedulePagination'], ParentType, ContextType, RequireFields<QueryScheduleArgs, 'filter' | 'page' | 'perPage'>>;
  session?: Resolver<ResolversTypes['Session'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['VideoQueries'], ParentType, ContextType>;
}>;

export type ScheduleItemResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['ScheduleItem'] = ResolversParentTypes['ScheduleItem']> = ResolversObject<{
  end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['BasicVideoMetadata'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SchedulePaginationResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['SchedulePagination'] = ResolversParentTypes['SchedulePagination']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['ScheduleItem']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserMutationResultResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['UserMutationResult'] = ResolversParentTypes['UserMutationResult']> = ResolversObject<{
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserMutationsResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['UserMutations'] = ResolversParentTypes['UserMutations']> = ResolversObject<{
  login?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<UserMutationsLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<UserMutationsProfileArgs, 'input'>>;
  register?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<UserMutationsRegisterArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRoleResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = ResolversObject<{
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['RoleType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = ResolversObject<{
  assets?: Resolver<Array<ResolversTypes['VideoAsset']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<ResolversTypes['VideoImages'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  viewCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoAssetResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoAsset'] = ResolversParentTypes['VideoAsset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoImagesResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoImages'] = ResolversParentTypes['VideoImages']> = ResolversObject<{
  thumbLarge?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbMedium?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbSmall?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoMutationErrorResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoMutationError'] = ResolversParentTypes['VideoMutationError']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type VideoMutationPayloadResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoMutationPayload'] = ResolversParentTypes['VideoMutationPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['VideoMutationError']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  videoId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoMutationsResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoMutations'] = ResolversParentTypes['VideoMutations']> = ResolversObject<{
  create?: Resolver<ResolversTypes['VideoMutationPayload'], ParentType, ContextType, RequireFields<VideoMutationsCreateArgs, 'input'>>;
  delete?: Resolver<ResolversTypes['VideoMutationPayload'], ParentType, ContextType, RequireFields<VideoMutationsDeleteArgs, 'videoId'>>;
  publish?: Resolver<ResolversTypes['VideoMutationPayload'], ParentType, ContextType, RequireFields<VideoMutationsPublishArgs, 'videoId'>>;
  unpublish?: Resolver<ResolversTypes['VideoMutationPayload'], ParentType, ContextType, RequireFields<VideoMutationsUnpublishArgs, 'videoId'>>;
  update?: Resolver<ResolversTypes['VideoMutationPayload'], ParentType, ContextType, RequireFields<VideoMutationsUpdateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoPaginationResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoPagination'] = ResolversParentTypes['VideoPagination']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Video']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoQueriesResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoQueries'] = ResolversParentTypes['VideoQueries']> = ResolversObject<{
  get?: Resolver<ResolversTypes['Video'], ParentType, ContextType, RequireFields<VideoQueriesGetArgs, 'id'>>;
  list?: Resolver<ResolversTypes['VideoPagination'], ParentType, ContextType, RequireFields<VideoQueriesListArgs, 'input'>>;
  search?: Resolver<ResolversTypes['VideoSearchResults'], ParentType, ContextType, RequireFields<VideoQueriesSearchArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoSearchResultsResolvers<ContextType = TochesContext, ParentType extends ResolversParentTypes['VideoSearchResults'] = ResolversParentTypes['VideoSearchResults']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Video']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = TochesContext> = ResolversObject<{
  BasicVideoMetadata?: BasicVideoMetadataResolvers<ContextType>;
  Bulletin?: BulletinResolvers<ContextType>;
  BulletinPagination?: BulletinPaginationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  LiveVideo?: LiveVideoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationEditor?: OrganizationEditorResolvers<ContextType>;
  PaginationInfo?: PaginationInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduleItem?: ScheduleItemResolvers<ContextType>;
  SchedulePagination?: SchedulePaginationResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserMutationResult?: UserMutationResultResolvers<ContextType>;
  UserMutations?: UserMutationsResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoAsset?: VideoAssetResolvers<ContextType>;
  VideoImages?: VideoImagesResolvers<ContextType>;
  VideoMutationError?: VideoMutationErrorResolvers<ContextType>;
  VideoMutationPayload?: VideoMutationPayloadResolvers<ContextType>;
  VideoMutations?: VideoMutationsResolvers<ContextType>;
  VideoPagination?: VideoPaginationResolvers<ContextType>;
  VideoQueries?: VideoQueriesResolvers<ContextType>;
  VideoSearchResults?: VideoSearchResultsResolvers<ContextType>;
}>;

