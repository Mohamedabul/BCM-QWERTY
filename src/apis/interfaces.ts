export interface Capability {
  id: string;
  name: string;
}
export interface Domain {
  id: string;
  name: string;
  core_id: string;
}
export interface SubDomain {
  id: string;
  name: string;
  domain_id: string;
}
