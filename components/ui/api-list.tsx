"use client";

import useOrigin from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "@/components/ui/apiAlert";
interface IApiList {
  entityName: string;
  entityIdName: string;
  customEntityField?: {
    title?: string;
    entityName: string;
    variant: "public" | "admin";
  };
}

const ApiList: React.FC<IApiList> = ({
  entityIdName,
  entityName,
  customEntityField,
}) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET ALL"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      {customEntityField && (
        <ApiAlert
          title={customEntityField.title || "GET MAIN"}
          variant={customEntityField.variant}
          description={`${baseUrl}/${entityName}/${customEntityField.entityName}`}
        />
      )}
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
