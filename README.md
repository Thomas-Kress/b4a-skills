# b4a-skills

AI agent skills for driving the b4A / best4Automic ReST API (Automic Automation).

These skills can be used by any AI coding agent that supports the skills format:

- **Claude Code** — skills are discovered automatically from `.claude/skills/` in your project.
- **Cursor (Agent mode)** — install the skills into your project and they become available to Cursor's AI agent for interactive chat, background agents, and cloud agents alike.
- **Other AI agents** — any tool that reads skill files (`SKILL.md`) can leverage these instructions to authenticate, run modules, and search objects against a b4A instance.

## Skills

Each skill's `SKILL.md` documents its prerequisites, usage, gotchas, and troubleshooting in detail. Obtain a token with `b4a-login`, run jobs with `b4a-module`, and pick the module-specific skill below for the job payload.

### Core

| Skill | Description |
|---|---|
| [`b4a-login`](skills/b4a-login/SKILL.md) | Request shape for logging in to the b4A ReST API and reading the access token / expiration from the response. |
| [`b4a-module`](skills/b4a-module/SKILL.md) | Shared `/module` lifecycle: start a job, poll status, fetch the report. |
| [`b4a-search`](skills/b4a-search/SKILL.md) | Search for Automic objects (jobs, folders, connections, etc.) via the `info.Search` module payload. |

### Information (`info.*`)

| Skill | Module | Description |
|---|---|---|
| [`b4a-info-agent`](skills/b4a-info-agent/SKILL.md) | `info.Agent` | Read the available agents of a client (and their access rights) into a CSV file. |
| [`b4a-info-breakpointread`](skills/b4a-info-breakpointread/SKILL.md) | `info.BreakpointRead` | Find workflow tasks with a breakpoint set; results as CSV. |
| [`b4a-info-checkpointread`](skills/b4a-info-checkpointread/SKILL.md) | `info.CheckpointRead` | Find workflow tasks with a checkpoint; results as CSV. |
| [`b4a-info-deactivateconditionread`](skills/b4a-info-deactivateconditionread/SKILL.md) | `info.DeactivateConditionRead` | Read the deactivation-condition attributes of tasks into a CSV file. |
| [`b4a-info-documentationread`](skills/b4a-info-documentationread/SKILL.md) | `info.DocumentationRead` | Read the XML and text documentation of objects into the module report. |
| [`b4a-info-environment`](skills/b4a-info-environment/SKILL.md) | `info.Environment` | Report environment details: server processes and agents (deployment vs. application nodes). |
| [`b4a-info-externalreferences`](skills/b4a-info-externalreferences/SKILL.md) | `info.ExternalReferences` | Check whether objects are used as external dependencies; results as CSV. |
| [`b4a-info-folder`](skills/b4a-info-folder/SKILL.md) | `info.Folder` | Describe all objects in a folder in a CSV file. |
| [`b4a-info-patternsearch`](skills/b4a-info-patternsearch/SKILL.md) | `info.PatternSearch` | Regex search across object attributes below a folder; results as CSV. |
| [`b4a-info-processsearch`](skills/b4a-info-processsearch/SKILL.md) | `info.ProcessSearch` | Find objects whose processes do (or do not) contain given code fragments. |
| [`b4a-info-reportread`](skills/b4a-info-reportread/SKILL.md) | `info.ReportRead` | Read execution reports of objects for a period of time into files. |
| [`b4a-info-schedule`](skills/b4a-info-schedule/SKILL.md) | `info.Schedule` | Analyse schedule objects and list all their tasks in a CSV file. |
| [`b4a-info-searchforuse`](skills/b4a-info-searchforuse/SKILL.md) | `info.SearchForUse` | Run "search for use"; results as CSV or a b4A datastream. |
| [`b4a-info-syncattributeread`](skills/b4a-info-syncattributeread/SKILL.md) | `info.SyncAttributeRead` | Read the sync attributes of runnable objects into a CSV file. |
| [`b4a-info-typecount`](skills/b4a-info-typecount/SKILL.md) | `info.TypeCount` | Count objects per object type in a folder. |
| [`b4a-info-userread`](skills/b4a-info-userread/SKILL.md) | `info.UserRead` | Read user objects and group memberships into CSV (input for `mc.UserEdit`). |
| [`b4a-info-variableread`](skills/b4a-info-variableread/SKILL.md) | `info.VariableRead` | Read variable objects into a CSV file. |
| [`b4a-info-variablesearch`](skills/b4a-info-variablesearch/SKILL.md) | `info.VariableSearch` | Search variables for one or more regular expressions. |
| [`b4a-info-variablesyncread`](skills/b4a-info-variablesyncread/SKILL.md) | `info.VariableSyncRead` | Create a file for syncing variables across clients (input for `mc.VariableSyncEdit`). |
| [`b4a-info-versionmanagement`](skills/b4a-info-versionmanagement/SKILL.md) | `info.VersionManagement` | Read version-management details of objects into structured documentation. |
| [`b4a-info-workflow`](skills/b4a-info-workflow/SKILL.md) | `info.Workflow` | Read workflows and their tasks recursively into a CSV file. |

### Mass changes (`mc.*`)

| Skill | Module | Description |
|---|---|---|
| [`b4a-mc-agentgroupcreate`](skills/b4a-mc-agentgroupcreate/SKILL.md) | `mc.AgentGroupCreate` | Create or edit agent groups. |
| [`b4a-mc-agentgroupedit`](skills/b4a-mc-agentgroupedit/SKILL.md) | `mc.AgentGroupEdit` | Set the mode of agent groups. |
| [`b4a-mc-agentlogset`](skills/b4a-mc-agentlogset/SKILL.md) | `mc.AgentLogSet` | Configure which protocol information is written to the agent log. |
| [`b4a-mc-agentreplace`](skills/b4a-mc-agentreplace/SKILL.md) | `mc.AgentReplace` | Replace agents in objects based on a mapping file. |
| [`b4a-mc-create`](skills/b4a-mc-create/SKILL.md) | `mc.Create` | Create objects from a template in a folder. |
| [`b4a-mc-deactivateconditionset`](skills/b4a-mc-deactivateconditionset/SKILL.md) | `mc.DeactivateConditionSet` | Set deactivation-condition attributes of tasks. |
| [`b4a-mc-delete`](skills/b4a-mc-delete/SKILL.md) | `mc.Delete` | Delete objects based on filter options. |
| [`b4a-mc-deleterecursive`](skills/b4a-mc-deleterecursive/SKILL.md) | `mc.DeleteRecursive` | Delete large numbers of objects in a folder structure. |
| [`b4a-mc-documentationedit`](skills/b4a-mc-documentationedit/SKILL.md) | `mc.DocumentationEdit` | Add or change text and XML documentation of objects. |
| [`b4a-mc-generateatruntimedeactivate`](skills/b4a-mc-generateatruntimedeactivate/SKILL.md) | `mc.GenerateAtRuntimeDeActivate` | Toggle the "generate at runtime" option of executable objects. |
| [`b4a-mc-locationsync`](skills/b4a-mc-locationsync/SKILL.md) | `mc.LocationSync` | Move objects in a target connection to the same folders as in the source connection. |
| [`b4a-mc-loginedit`](skills/b4a-mc-loginedit/SKILL.md) | `mc.LoginEdit` | Modify or add entries in login objects. |
| [`b4a-mc-maxruntimeedit`](skills/b4a-mc-maxruntimeedit/SKILL.md) | `mc.MaxRuntimeEdit` | Edit maximum-runtime monitoring options and actions. |
| [`b4a-mc-move`](skills/b4a-mc-move/SKILL.md) | `mc.Move` | Move objects to another folder, recreating the folder structure. |
| [`b4a-mc-objectpromptsetedit`](skills/b4a-mc-objectpromptsetedit/SKILL.md) | `mc.ObjectPromptSetEdit` | Attach or replace PromptSets on executable objects. |
| [`b4a-mc-objectvariableedit`](skills/b4a-mc-objectvariableedit/SKILL.md) | `mc.ObjectVariableEdit` | Modify object variables of executable objects via a b4A script. |
| [`b4a-mc-processedit`](skills/b4a-mc-processedit/SKILL.md) | `mc.ProcessEdit` | Mass-edit AE script or OS code in object processes. |
| [`b4a-mc-rename`](skills/b4a-mc-rename/SKILL.md) | `mc.Rename` | Rename objects according to naming rules. |
| [`b4a-mc-restore`](skills/b4a-mc-restore/SKILL.md) | `mc.Restore` | Restore previous object versions from version management. |
| [`b4a-mc-resultevaluationset`](skills/b4a-mc-resultevaluationset/SKILL.md) | `mc.ResultEvaluationSet` | Set result evaluation / error handling for workflow and schedule tasks. |
| [`b4a-mc-scheduletaskadd`](skills/b4a-mc-scheduletaskadd/SKILL.md) | `mc.ScheduleTaskAdd` | Add tasks with time and calendar conditions to schedules. |
| [`b4a-mc-scheduletaskdeactivate`](skills/b4a-mc-scheduletaskdeactivate/SKILL.md) | `mc.ScheduleTaskDeActivate` | Activate or deactivate schedule tasks. |
| [`b4a-mc-scheduletaskremove`](skills/b4a-mc-scheduletaskremove/SKILL.md) | `mc.ScheduleTaskRemove` | Remove schedule tasks matching a name pattern. |
| [`b4a-mc-servicelevelobjectiveedit`](skills/b4a-mc-servicelevelobjectiveedit/SKILL.md) | `mc.ServiceLevelObjectiveEdit` | Edit service level objectives (SLOs). |
| [`b4a-mc-syncattributeedit`](skills/b4a-mc-syncattributeedit/SKILL.md) | `mc.SyncAttributeEdit` | Add or replace sync attributes of objects from a file. |
| [`b4a-mc-titlegenerate`](skills/b4a-mc-titlegenerate/SKILL.md) | `mc.TitleGenerate` | Generate object titles. |
| [`b4a-mc-userdeactivate`](skills/b4a-mc-userdeactivate/SKILL.md) | `mc.UserDeActivate` | Activate or deactivate user accounts. |
| [`b4a-mc-useredit`](skills/b4a-mc-useredit/SKILL.md) | `mc.UserEdit` | Create and modify users from a CSV file. |
| [`b4a-mc-usergroupaddusers`](skills/b4a-mc-usergroupaddusers/SKILL.md) | `mc.UserGroupAddUsers` | Add users to a user group. |
| [`b4a-mc-usergroupauthorizationedit`](skills/b4a-mc-usergroupauthorizationedit/SKILL.md) | `mc.UserGroupAuthorizationEdit` | Add, remove, or set group authorizations from a JSON file. |
| [`b4a-mc-usergroupprivilegeedit`](skills/b4a-mc-usergroupprivilegeedit/SKILL.md) | `mc.UserGroupPrivilegeEdit` | Add, remove, or set user group privileges. |
| [`b4a-mc-userprivilegeedit`](skills/b4a-mc-userprivilegeedit/SKILL.md) | `mc.UserPrivilegeEdit` | Add, remove, or set user privileges. |
| [`b4a-mc-variabledelete`](skills/b4a-mc-variabledelete/SKILL.md) | `mc.VariableDelete` | Delete entries in variable objects. |
| [`b4a-mc-variableedit`](skills/b4a-mc-variableedit/SKILL.md) | `mc.VariableEdit` | Change keys or values in variable objects via a b4A script. |
| [`b4a-mc-variableset`](skills/b4a-mc-variableset/SKILL.md) | `mc.VariableSet` | Change or add entries in variable objects. |
| [`b4a-mc-variablesyncedit`](skills/b4a-mc-variablesyncedit/SKILL.md) | `mc.VariableSyncEdit` | Sync variable entries across clients. |
| [`b4a-mc-workflowtaskadd`](skills/b4a-mc-workflowtaskadd/SKILL.md) | `mc.WorkflowTaskAdd` | Add tasks to workflows after a given predecessor. |
| [`b4a-mc-workflowtaskdeactivate`](skills/b4a-mc-workflowtaskdeactivate/SKILL.md) | `mc.WorkflowTaskDeActivate` | Activate or deactivate tasks in workflow definitions. |
| [`b4a-mc-workflowtaskreplace`](skills/b4a-mc-workflowtaskreplace/SKILL.md) | `mc.WorkflowTaskReplace` | Replace workflow tasks based on a mapping file. |

### Package management (`pm.*`)

| Skill | Module | Description |
|---|---|---|
| [`b4a-pm-actionregister`](skills/b4a-pm-actionregister/SKILL.md) | `pm.ActionRegister` | Register package actions so they can be added to workflows. |
| [`b4a-pm-build`](skills/b4a-pm-build/SKILL.md) | `pm.Build` | Build a release archive (ZIP) of a package. |
| [`b4a-pm-compliance`](skills/b4a-pm-compliance/SKILL.md) | `pm.Compliance` | Check package objects against configurable compliance rules. |
| [`b4a-pm-credentialstorageadd`](skills/b4a-pm-credentialstorageadd/SKILL.md) | `pm.CredentialStorageAdd` | Add credentials to a storage object for use during installation. |
| [`b4a-pm-credentialstoragedownload`](skills/b4a-pm-credentialstoragedownload/SKILL.md) | `pm.CredentialStorageDownload` | Download stored credentials to files. |
| [`b4a-pm-dependencycheck`](skills/b4a-pm-dependencycheck/SKILL.md) | `pm.DependencyCheck` | Check whether a package's dependencies are satisfied in a target system. |
| [`b4a-pm-dependencydefinitioncreate`](skills/b4a-pm-dependencydefinitioncreate/SKILL.md) | `pm.DependencyDefinitionCreate` | Generate a dependency definition for a package. |
| [`b4a-pm-dependencydefinitionverify`](skills/b4a-pm-dependencydefinitionverify/SKILL.md) | `pm.DependencyDefinitionVerify` | Verify dependency definitions against actual dependencies. |
| [`b4a-pm-docbuilder`](skills/b4a-pm-docbuilder/SKILL.md) | `pm.DocBuilder` | Generate package documentation from templates (HTML, Confluence, Markdown, SVG). |
| [`b4a-pm-importbpmn`](skills/b4a-pm-importbpmn/SKILL.md) | `pm.ImportBPMN` | Convert BPMN specifications into executable workflows. |
| [`b4a-pm-index`](skills/b4a-pm-index/SKILL.md) | `pm.Index` | Create a package index of installed packages and their metadata. |
| [`b4a-pm-indexdocbuilder`](skills/b4a-pm-indexdocbuilder/SKILL.md) | `pm.IndexDocBuilder` | Generate documentation for the package index from templates. |
| [`b4a-pm-init`](skills/b4a-pm-init/SKILL.md) | `pm.Init` | Create the template structure for a new package. |
| [`b4a-pm-install`](skills/b4a-pm-install/SKILL.md) | `pm.Install` | Install a package archive built with `pm.Build`. |
| [`b4a-pm-list`](skills/b4a-pm-list/SKILL.md) | `pm.List` | List all installed packages. |
| [`b4a-pm-listfolders`](skills/b4a-pm-listfolders/SKILL.md) | `pm.ListFolders` | List the base folders configured in `pm.conf`. |
| [`b4a-pm-reportinstallation`](skills/b4a-pm-reportinstallation/SKILL.md) | `pm.ReportInstallation` | Report all packages installed in a tenant. |
| [`b4a-pm-reportmodifications`](skills/b4a-pm-reportmodifications/SKILL.md) | `pm.ReportModifications` | Report package modifications since the last build. |
| [`b4a-pm-repository`](skills/b4a-pm-repository/SKILL.md) | `pm.Repository` | Manage a release repository: upload, download, and list packages and versions. |
| [`b4a-pm-requiredby`](skills/b4a-pm-requiredby/SKILL.md) | `pm.RequiredBy` | Find packages that depend on a given package. |
| [`b4a-pm-requires`](skills/b4a-pm-requires/SKILL.md) | `pm.Requires` | Find references from a package to objects in other packages. |
| [`b4a-pm-templateregister`](skills/b4a-pm-templateregister/SKILL.md) | `pm.TemplateRegister` | Register object templates shipped with packages. |
| [`b4a-pm-unused`](skills/b4a-pm-unused/SKILL.md) | `pm.Unused` | Find unused objects within a package. |

### Task execution (`te.*`)

| Skill | Module | Description |
|---|---|---|
| [`b4a-te-breakpointrelease`](skills/b4a-te-breakpointrelease/SKILL.md) | `te.BreakpointRelease` | Release breakpoints of active workflows. |
| [`b4a-te-cancel`](skills/b4a-te-cancel/SKILL.md) | `te.Cancel` | Cancel active, blocked, or waiting tasks (optionally recursively). |
| [`b4a-te-commentadd`](skills/b4a-te-commentadd/SKILL.md) | `te.CommentAdd` | Add a comment to a statistic record by runID. |
| [`b4a-te-count`](skills/b4a-te-count/SKILL.md) | `te.Count` | Count executions of runnable objects in a period. |
| [`b4a-te-deactivate`](skills/b4a-te-deactivate/SKILL.md) | `te.Deactivate` | Deactivate activities of a client, including workflow tasks. |
| [`b4a-te-detailread`](skills/b4a-te-detailread/SKILL.md) | `te.DetailRead` | Read execution details of objects for a period, filtered by status. |
| [`b4a-te-read`](skills/b4a-te-read/SKILL.md) | `te.Read` | Search activities by several criteria. |
| [`b4a-te-restart`](skills/b4a-te-restart/SKILL.md) | `te.Restart` | Restart a task. |
| [`b4a-te-scheduletaskreset`](skills/b4a-te-scheduletaskreset/SKILL.md) | `te.ScheduleTaskReset` | Reset schedule tasks that ended with `ENDED_TIMEOUT`. |
| [`b4a-te-statusmodify`](skills/b4a-te-statusmodify/SKILL.md) | `te.StatusModify` | Set the status of tasks (last resort). |
| [`b4a-te-unblock`](skills/b4a-te-unblock/SKILL.md) | `te.Unblock` | Unblock tasks of a workflow by runID. |
| [`b4a-te-workflowcontinue`](skills/b4a-te-workflowcontinue/SKILL.md) | `te.WorkflowContinue` | Continue or cancel workflows. |
| [`b4a-te-workflowmonitoredit`](skills/b4a-te-workflowmonitoredit/SKILL.md) | `te.WorkflowMonitorEdit` | Modify a running workflow's monitor: breakpoints, added jobs, inactive tasks, comments. |

### Transport (`tp.*`)

| Skill | Module | Description |
|---|---|---|
| [`b4a-tp-crosscopy`](skills/b4a-tp-crosscopy/SKILL.md) | `tp.CrossCopy` | Copy folder structures recursively from one client to another. |
| [`b4a-tp-export`](skills/b4a-tp-export/SKILL.md) | `tp.Export` | Export objects as XML files, mirroring the folder structure. |
| [`b4a-tp-import`](skills/b4a-tp-import/SKILL.md) | `tp.Import` | Import objects exported with `tp.Export`. |
| [`b4a-tp-markdeprecated`](skills/b4a-tp-markdeprecated/SKILL.md) | `tp.MarkDeprecated` | Mark unused objects as deprecated (e.g. by renaming). |
| [`b4a-tp-movetotransportcase`](skills/b4a-tp-movetotransportcase/SKILL.md) | `tp.MoveToTransportCase` | Move objects to the transport case. |
| [`b4a-tp-variableexport`](skills/b4a-tp-variableexport/SKILL.md) | `tp.VariableExport` | Export variable objects as CSV files. |
| [`b4a-tp-variableimport`](skills/b4a-tp-variableimport/SKILL.md) | `tp.VariableImport` | Import variable objects exported with `tp.VariableExport`. |

## Installation

Install these skills into a project with the [`skills`](https://www.npmjs.com/package/skills) CLI:

```
npx skills@latest add https://github.com/Thomas-Kress/b4a-skills.git
```

This copies the skills into your project's `.claude/skills/` directory so Claude Code can discover and use them.

## Prerequisites

- A reachable B4A / best4Automic instance
- A `.env` file at your project root:

  ```
  B4A_REST_API_URL=http://localhost:9081
  B4A_REST_API_USERNAME=USER/DEPARTMENT
  B4A_REST_API_PASSWORD=...
  B4A_DEFAULT_CONNECTION=connection
  ```

  | Variable | Required | Use |
  |---|---|---|
  | `B4A_REST_API_URL` | yes | Base URL of the b4A ReST API. No trailing slash. |
  | `B4A_REST_API_USERNAME` | yes | Login user in `USER/DEPARTMENT` form. |
  | `B4A_REST_API_PASSWORD` | yes | Login password. Often Automic-encrypted (starts with `--`); pass it through unmodified. |
  | `B4A_DEFAULT_CONNECTION` | unless a connection is named in the request | Default Automic connection for `/module` jobs (including search) when the user does not pass one. |
