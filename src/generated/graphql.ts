import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { VideoWithDescendants, VideoPaginationWithDescendants, ScheduleItemWithDescendants, SchedulePaginationWithDescendants, OrganizationWithDescendants } from '../modules/graphql/types';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Bulletin = {
  __typename?: 'Bulletin';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BulletinInput = {
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BulletinPagination = {
  __typename?: 'BulletinPagination';
  items: Array<Bulletin>;
  pageInfo: PaginationInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Session;
  logout?: Maybe<Scalars['Boolean']>;
  updateBulletin?: Maybe<Bulletin>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateBulletinArgs = {
  bulletin: BulletinInput;
  id?: InputMaybe<Scalars['ID']>;
};

export type Organization = {
  __typename?: 'Organization';
  brregId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editor: OrganizationEditor;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latestVideos?: Maybe<Array<Video>>;
  name: Scalars['String'];
  postalAddress: Scalars['String'];
  streetAddress: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationEditor = {
  __typename?: 'OrganizationEditor';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bulletin: Bulletin;
  bulletins?: Maybe<BulletinPagination>;
  organization: Organization;
  schedule?: Maybe<SchedulePagination>;
  session: Session;
  video: Video;
  videos?: Maybe<VideoPagination>;
};


export type QueryBulletinArgs = {
  id: Scalars['ID'];
};


export type QueryBulletinsArgs = {
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryScheduleArgs = {
  filter: ScheduleFilter;
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type QueryVideoArgs = {
  id: Scalars['ID'];
};


export type QueryVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
  sort?: InputMaybe<Array<VideoSort>>;
};

export type ScheduleFilter = {
  from?: InputMaybe<Scalars['DateTime']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  startsAt: Scalars['DateTime'];
  video: Video;
};

export type SchedulePagination = {
  __typename?: 'SchedulePagination';
  items: Array<ScheduleItem>;
  pageInfo: PaginationInfo;
};

export type Session = {
  __typename?: 'Session';
  authenticated: Scalars['Boolean'];
  profileData?: Maybe<UserProfileData>;
};

export type UserProfileData = {
  __typename?: 'UserProfileData';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Video = {
  __typename?: 'Video';
  assets: Array<VideoAsset>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  organization: Organization;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount?: Maybe<Scalars['Int']>;
};

export type VideoAsset = {
  __typename?: 'VideoAsset';
  id: Scalars['ID'];
  path: Scalars['String'];
  type: Scalars['String'];
};

export type VideoFilter = {
  organizationId?: InputMaybe<Scalars['ID']>;
  query?: InputMaybe<Scalars['String']>;
};

export type VideoPagination = {
  __typename?: 'VideoPagination';
  items: Array<Maybe<Video>>;
  pageInfo: PaginationInfo;
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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  Bulletin: ResolverTypeWrapper<DeepPartial<Bulletin>>;
  BulletinInput: ResolverTypeWrapper<DeepPartial<BulletinInput>>;
  BulletinPagination: ResolverTypeWrapper<DeepPartial<BulletinPagination>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars['DateTime']>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<OrganizationWithDescendants>;
  OrganizationEditor: ResolverTypeWrapper<DeepPartial<OrganizationEditor>>;
  PaginationInfo: ResolverTypeWrapper<DeepPartial<PaginationInfo>>;
  Query: ResolverTypeWrapper<{}>;
  ScheduleFilter: ResolverTypeWrapper<DeepPartial<ScheduleFilter>>;
  ScheduleItem: ResolverTypeWrapper<ScheduleItemWithDescendants>;
  SchedulePagination: ResolverTypeWrapper<SchedulePaginationWithDescendants>;
  Session: ResolverTypeWrapper<DeepPartial<Session>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  UserProfileData: ResolverTypeWrapper<DeepPartial<UserProfileData>>;
  Video: ResolverTypeWrapper<VideoWithDescendants>;
  VideoAsset: ResolverTypeWrapper<DeepPartial<VideoAsset>>;
  VideoFilter: ResolverTypeWrapper<DeepPartial<VideoFilter>>;
  VideoPagination: ResolverTypeWrapper<VideoPaginationWithDescendants>;
  VideoSort: ResolverTypeWrapper<DeepPartial<VideoSort>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: DeepPartial<Scalars['Boolean']>;
  Bulletin: DeepPartial<Bulletin>;
  BulletinInput: DeepPartial<BulletinInput>;
  BulletinPagination: DeepPartial<BulletinPagination>;
  DateTime: DeepPartial<Scalars['DateTime']>;
  ID: DeepPartial<Scalars['ID']>;
  Int: DeepPartial<Scalars['Int']>;
  Mutation: {};
  Organization: OrganizationWithDescendants;
  OrganizationEditor: DeepPartial<OrganizationEditor>;
  PaginationInfo: DeepPartial<PaginationInfo>;
  Query: {};
  ScheduleFilter: DeepPartial<ScheduleFilter>;
  ScheduleItem: ScheduleItemWithDescendants;
  SchedulePagination: SchedulePaginationWithDescendants;
  Session: DeepPartial<Session>;
  String: DeepPartial<Scalars['String']>;
  UserProfileData: DeepPartial<UserProfileData>;
  Video: VideoWithDescendants;
  VideoAsset: DeepPartial<VideoAsset>;
  VideoFilter: DeepPartial<VideoFilter>;
  VideoPagination: VideoPaginationWithDescendants;
}>;

export type BulletinResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bulletin'] = ResolversParentTypes['Bulletin']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BulletinPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BulletinPagination'] = ResolversParentTypes['BulletinPagination']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Bulletin']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updateBulletin?: Resolver<Maybe<ResolversTypes['Bulletin']>, ParentType, ContextType, RequireFields<MutationUpdateBulletinArgs, 'bulletin'>>;
}>;

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
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

export type OrganizationEditorResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationEditor'] = ResolversParentTypes['OrganizationEditor']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationInfo'] = ResolversParentTypes['PaginationInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bulletin?: Resolver<ResolversTypes['Bulletin'], ParentType, ContextType, RequireFields<QueryBulletinArgs, 'id'>>;
  bulletins?: Resolver<Maybe<ResolversTypes['BulletinPagination']>, ParentType, ContextType, RequireFields<QueryBulletinsArgs, 'page' | 'perPage'>>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<QueryOrganizationArgs, 'id'>>;
  schedule?: Resolver<Maybe<ResolversTypes['SchedulePagination']>, ParentType, ContextType, RequireFields<QueryScheduleArgs, 'filter' | 'page' | 'perPage'>>;
  session?: Resolver<ResolversTypes['Session'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Video'], ParentType, ContextType, RequireFields<QueryVideoArgs, 'id'>>;
  videos?: Resolver<Maybe<ResolversTypes['VideoPagination']>, ParentType, ContextType, RequireFields<QueryVideosArgs, 'page' | 'perPage'>>;
}>;

export type ScheduleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleItem'] = ResolversParentTypes['ScheduleItem']> = ResolversObject<{
  endsAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startsAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Video'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SchedulePaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchedulePagination'] = ResolversParentTypes['SchedulePagination']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['ScheduleItem']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  profileData?: Resolver<Maybe<ResolversTypes['UserProfileData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfileData'] = ResolversParentTypes['UserProfileData']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = ResolversObject<{
  assets?: Resolver<Array<ResolversTypes['VideoAsset']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  viewCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoAssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoAsset'] = ResolversParentTypes['VideoAsset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VideoPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoPagination'] = ResolversParentTypes['VideoPagination']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Video']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Bulletin?: BulletinResolvers<ContextType>;
  BulletinPagination?: BulletinPaginationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationEditor?: OrganizationEditorResolvers<ContextType>;
  PaginationInfo?: PaginationInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduleItem?: ScheduleItemResolvers<ContextType>;
  SchedulePagination?: SchedulePaginationResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  UserProfileData?: UserProfileDataResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoAsset?: VideoAssetResolvers<ContextType>;
  VideoPagination?: VideoPaginationResolvers<ContextType>;
}>;
