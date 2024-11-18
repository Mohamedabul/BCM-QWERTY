const baseUrl = process.env.REACT_APP_API_URL;
const baseHeader = {
  "Content-Type": "application/json",
};

export const fetchDashboardTableData = async () => {
  const response = await fetch(baseUrl + "getDashboardTableData");
  const result = await response.json();
  return result;
};

export const getDashBoardCounts = async () => {
  const response = await fetch(baseUrl + "dashBoardCounts");
  const result = await response.json();
  return result;
};

export const fetchCorecapability = async () => {
  const response = await fetch(baseUrl + "corecapability");
  const result = await response.json();
  return result;
};

export const createCorecapability = async (body: string) => {
  const response = await fetch(baseUrl + "coreCapability", {
    method: "POST",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();
  return result;
};

export const patchCorecapability = async (id: string,body: string) => {
  const response = await fetch(baseUrl + `coreCapability/${id}`, {
    method: "PATCH",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();
  return result;
};

export const deleteCorecapability = async (id: string) => {
  const response = await fetch(baseUrl + "coreCapability/" + id, {
    method: "DELETE",
    headers: baseHeader,
  });
  const result = await response.json();

  return result;
};

export const fetchDomain = async () => {
  const response = await fetch(baseUrl + "domain");
  const result = await response.json();
  return result;
};

export const createDomain = async (body: string) => {
  const response = await fetch(baseUrl + "domain", {
    method: "POST",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();
  return result;
};

export const fetchDomainByCapability = async (queryString: string) => {
  const response = await fetch(baseUrl + "domainByCapability?" + queryString);
  const result = await response.json();
  return result;
};

export const fetchSubdomain = async () => {
  const response = await fetch(baseUrl + "subdomain");
  const result = await response.json();
  return result;
};

export const fetchSubdomainByDomain = async (queryString: string) => {
  const response = await fetch(baseUrl + "subdomainBydomain?" + queryString);
  const result = await response.json();
  return result;
};

export const createSubdomain = async (body: string) => {
  const response = await fetch(baseUrl + "subdomain", {
    method: "POST",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();

  return result;
}

export const patchEndpoint = async (path: string, body: string) => {
  const response = await fetch(path, {
    method: "PATCH",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();

  return result;
};

export const deleteEndpoint = async (path: string) => {
  const response = await fetch(path, {
    method: "DELETE",
    headers: baseHeader,
  });

  const result = await response.json();

  return result;
};

export const createApplication = async (body: string) => {
  const response = await fetch(baseUrl + "application", {
    method: "POST",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();

  return result;
};

export const patchApplication = async (id: string, body: string) => {
  const response = await fetch(baseUrl + "application/" + id, {
    method: "PATCH",
    headers: baseHeader,
    body: body,
  });
  const result = await response.json();

  return result;
};

export const deleteApplication = async (id: string) => {
  const response = await fetch(baseUrl + "application/" + id, {
    method: "DELETE",
    headers: baseHeader,
  });
  const result = await response.json();

  return result;
};

export const getMappedApplications = async (queryString: string) => {
  const response = await fetch(
    baseUrl + "getMappedApplications?" + queryString
  );
  const result = await response.json();

  return result;
};

export const getOrphans = async (queryString: string) => {
  const response = await fetch(baseUrl + "getOrphans?" + queryString);
  const result = await response.json();

  return result;
};

export const uploadFile = async (formData: any) => {
  const response = await fetch(baseUrl + "upload", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  return result;
};

export const fetchTemplateCorecapability = async () => {
  const response = await fetch(baseUrl + "template/coreCapability");
  const result = await response.json();
  return result;
};

export const fetchTemplateDomainByCapability = async (queryString: string) => {
  const response = await fetch(
    baseUrl + "template/domainByCapability?" + queryString
  );
  const result = await response.json();
  return result;
};


export const fetchTemplateSubdomainByDomain = async (queryString: string) => {
  const response = await fetch(
    baseUrl + "template/subdomainBydomain?" + queryString
  );
  const result = await response.json();
  return result;
};
